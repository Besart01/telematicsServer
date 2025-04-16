import { TeltonikaParser } from './TeltonikaParser/teltonikaParser';
import { lastMapParameters, mapParameters } from './parameterMapper';
import { InfluxService, ConnectedDevice, DeviceTelemetry } from './db';
import net from 'net';

export class ConnectionHandlers {
    static async handleData(data: Buffer, socket: net.Socket, connId: string, devices: Map<string, any>) {
        try {
            const result = TeltonikaParser.processPacket(data);
            const device = devices.get(connId);
            if (!device) return;

            // Update the last active timestamp
            device.lastActiveAt = new Date();

            if (result.type === 'imei') {
                await this.handleImei(result, socket, device);
            } else if (result.data.CodecType === 'data sending') {
                await this.handleDeviceTelemetry(result, socket, device);
            } //else if (result.data.CodecType === 'GPRS messages') {}
        } catch (error) {
            console.error(`Error from ${connId}:`, error instanceof Error ? error.message : error);
        }
    }

    private static async handleImei(result: any, socket: net.Socket, device: any) {
        device.imei = result.imei;
        console.log(`IMEI : ${result.imei}`);

        if (socket.remoteAddress) {
            try {
                const connectedDevice: ConnectedDevice = {
                    imei: result.imei,
                    ipAddress: socket.remoteAddress,
                    port: socket.remotePort || 0,
                    connectedAt: device.connectedAt,
                    lastActiveAt: device.lastActiveAt
                };

                await InfluxService.saveConnectedDevice(connectedDevice);
            } catch (dbError) {
                console.error(`Error saving connection to InfluxDB for ${result.imei}:`, dbError);
            }
        }
    }

    private static async handleDeviceTelemetry(result: any, socket: net.Socket, device: any) {
        const content = result.data.Content as { AVL_Datas?: any[] };

        if (content.AVL_Datas && device.imei) {
            const avlDataArray = content.AVL_Datas.map(avl => ({
                timestamp: avl.Timestamp,
                gps: avl.GPSelement,
                io: {
                    EventID: avl.IOelement.EventID,
                    ElementCount: avl.IOelement.ElementCount,
                    Elements: avl.IOelement.Elements
                }
            }));

            const mappedData = mapParameters(avlDataArray);
            const lastestMappedData = lastMapParameters(avlDataArray);

            console.log(`${device.imei}:`, mappedData);
            console.log(`${device.imei} lastest Data:`, lastestMappedData);

            if (lastestMappedData) {
                await this.saveTelemetry(device, lastestMappedData);
            }

            if (socket.remoteAddress) {
                await this.updateDeviceConnection(socket, device);
            }
        }
    }

    private static async saveTelemetry(device: any, data: any) {
        try {
            const telemetryPoint: DeviceTelemetry = {
                imei: device.imei,
                eventId: data.eventId,
                timestamp: new Date(),
                gps: data.gps,
                elements: data.elements
            };

            await InfluxService.saveDeviceTelemetry(telemetryPoint);
        } catch (dbError) {
            console.error(`Error updating activity in InfluxDB for ${device.imei}:`, dbError);
        }
    }

    private static async updateDeviceConnection(socket: net.Socket, device: any) {
        try {
            const connectedDevice: ConnectedDevice = {
                imei: device.imei,
                ipAddress: socket.remoteAddress!,
                port: socket.remotePort || 0,
                connectedAt: device.connectedAt,
                lastActiveAt: device.lastActiveAt
            };

            await InfluxService.saveConnectedDevice(connectedDevice);
        } catch (dbError) {
            console.error(`Error updating activity in InfluxDB for ${device.imei}:`, dbError);
        }
    }

    static async handleClose(connId: string, socket: net.Socket, devices: Map<string, any>) {
        console.log(`Connection closed: ${connId}`);
        const device = devices.get(connId);

        if (device?.imei && socket.remoteAddress) {
            try {
                await InfluxService.markDeviceDisconnected(
                    device.imei,
                    socket.remoteAddress,
                    new Date()
                );
            } catch (dbError) {
                console.error(`Error marking device as disconnected in InfluxDB for ${device.imei}:`, dbError);
            }
        }

        devices.delete(connId);
    }

    static handleError(err: Error, connId: string) {
        console.error(`Socket error on ${connId}:`, err.message);
    }
}