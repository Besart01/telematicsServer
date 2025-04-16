// import {writeApi, queryApi, influxConfig} from '../config';
// import { ConnectedDevice, createConnectedDevicePoint } from '../models/deviceModel';
// import { DeviceTelemetry, createTelemetryPoint } from '../models/deviceTelematicsModel';
// import {Point} from "@influxdata/influxdb-client";
//
// export class InfluxService {
//     /**
//      * Save connected device status to InfluxDB
//      * @param device The connected device information
//      */
//     static async saveConnectedDevice(device: ConnectedDevice): Promise<void> {
//         try {
//             const point = createConnectedDevicePoint(device);
//             writeApi.writePoint(point);
//             await writeApi.flush();
//             console.log(`Connection status for device ${device.imei} saved to InfluxDB`);
//         } catch (error) {
//             console.error('Error saving device connection to InfluxDB:', error);
//             throw error;
//         }
//     }
//
//     /**
//      * Update device status to disconnected
//      * @param imei Device IMEI
//      * @param ipAddress Device IP address
//      * @param disconnectedAt Timestamp when device disconnected
//      */
//     static async markDeviceDisconnected(
//         imei: string,
//         ipAddress: string,
//         disconnectedAt: Date = new Date()
//     ): Promise<void> {
//         try {
//             const point = new Point('connected_devices')
//                 .tag('imei', imei)
//                 .tag('ip_address', ipAddress)
//                 .booleanField('connected', false)
//                 .timestamp(disconnectedAt);
//
//             writeApi.writePoint(point);
//             await writeApi.flush();
//             console.log(`Device ${imei} marked as disconnected in InfluxDB`);
//         } catch (error) {
//             console.error('Error marking device as disconnected in InfluxDB:', error);
//             throw error;
//         }
//     }
//
//     /**
//      * Save telemetry data to InfluxDB
//      * @param telemetry The device telemetry data
//      */
//     static async saveDeviceTelemetry(telemetry: DeviceTelemetry): Promise<void> {
//         try {
//             const point = createTelemetryPoint(telemetry);
//             writeApi.writePoint(point);
//             await writeApi.flush();
//             console.log(`Telemetry for device ${telemetry.imei} saved to InfluxDB`);
//         } catch (error) {
//             console.error('Error saving device telemetry to InfluxDB:', error);
//             throw error;
//         }
//     }
//
//     /**
//      * Get currently connected devices
//      * @returns Promise with list of connected devices
//      */
//     static async getConnectedDevices(): Promise<string[]> {
//         const fluxQuery = `
//       from(bucket: "${influxConfig.bucket}")
//         |> range(start: -1h)
//         |> filter(fn: (r) => r._measurement == "connected_devices")
//         |> filter(fn: (r) => r._field == "connected")
//         |> filter(fn: (r) => r._value == true)
//         |> group(columns: ["imei"])
//         |> last()
//         |> keep(columns: ["imei"])
//     `;
//
//         try {
//             const connectedDevices: string[] = [];
//             await new Promise<void>((resolve, reject) => {
//                 queryApi.queryRows(fluxQuery, {
//                     next: (row, tableMeta) => {
//                         const result = tableMeta.toObject(row);
//                         if (result.imei) {
//                             connectedDevices.push(result.imei);
//                         }
//                     },
//                     error: (error) => {
//                         console.error('Error querying connected devices:', error);
//                         reject(error);
//                     },
//                     complete: () => {
//                         resolve();
//                     }
//                 });
//             });
//
//             return connectedDevices;
//         } catch (error) {
//             console.error('Error in getConnectedDevices:', error);
//             throw error;
//         }
//     }
// }
//


import { writeApi, queryApi, influxConfig } from '../config';
import { ConnectedDevice, createConnectedDevicePoint } from '../models/deviceModel';
import {DeviceTelemetry, createTelemetryPoint, GpsData, DeviceElements} from '../models/deviceTelematicsModel';
import { Point } from '@influxdata/influxdb-client';

export class InfluxService {
    /**
     * Save connected device status to InfluxDB
     * @param device The connected device information
     */
    static async saveConnectedDevice(device: ConnectedDevice): Promise<void> {
        try {
            const point = createConnectedDevicePoint(device);
            writeApi.writePoint(point);
            await writeApi.flush();
            console.log(`Connection status for device ${device.imei} saved to InfluxDB`);
        } catch (error) {
            console.error('Error saving device connection to InfluxDB:', error);
            throw error;
        }
    }

    /**
     * Update device status to disconnected
     * @param imei Device IMEI
     * @param ipAddress Device IP address
     * @param disconnectedAt Timestamp when device disconnected
     */
    static async markDeviceDisconnected(
        imei: string,
        ipAddress: string,
        disconnectedAt: Date = new Date()
    ): Promise<void> {
        try {
            const point = new Point('connected_devices')
                .tag('imei', imei)
                .tag('ip_address', ipAddress)
                .booleanField('connected', false)
                .timestamp(disconnectedAt);

            writeApi.writePoint(point);
            await writeApi.flush();
            console.log(`Device ${imei} marked as disconnected in InfluxDB`);
        } catch (error) {
            console.error('Error marking device as disconnected in InfluxDB:', error);
            throw error;
        }
    }

    /**
     * Save telemetry data to InfluxDB
     * @param telemetry The device telematics data
     */
    static async saveDeviceTelemetry(telemetry: DeviceTelemetry): Promise<void> {
        try {
            const point = createTelemetryPoint(telemetry);
            writeApi.writePoint(point);
            console.log(`Data Created ${point.toString()}`);
            await writeApi.flush();
            console.log(`Telemetry for device ${telemetry.imei} saved to InfluxDB`);
        } catch (error) {
            console.error('Error saving device telemetry to InfluxDB:', error);
            throw error;
        }
    }

    /**
     * Get currently connected devices
     * @returns Promise with list of connected devices
     */
    static async getConnectedDevices(): Promise<string[]> {
        const fluxQuery = `
            from(bucket: "${influxConfig.bucket}")
                |> range(start: -1h)
                |> filter(fn: (r) => r._measurement == "connected_devices")
                |> filter(fn: (r) => r._field == "connected")
                |> filter(fn: (r) => r._value == true)
                |> group(columns: ["imei"])
                |> last()
                |> keep(columns: ["imei"])
        `;

        try {
            const connectedDevices: string[] = [];
            await new Promise<void>((resolve, reject) => {
                queryApi.queryRows(fluxQuery, {
                    next: (row, tableMeta) => {
                        const result = tableMeta.toObject(row);
                        if (result.imei) {
                            connectedDevices.push(result.imei);
                        }
                    },
                    error: (error) => {
                        console.error('Error querying connected devices:', error);
                        reject(error);
                    },
                    complete: () => {
                        resolve();
                    }
                });
            });

            return connectedDevices;
        } catch (error) {
            console.error('Error in getConnectedDevices:', error);
            throw error;
        }
    }

    /**
     * Get the latest telemetry for a device by IMEI
     * @param imei The device IMEI
     * @returns The latest telemetry entry
     */
    static async getLatestTelemetry(imei: string): Promise<DeviceTelemetry | null> {
        const fluxQuery = `
            from(bucket: "${influxConfig.telemetryBucket}")
                |> range(start: -1h)
                |> filter(fn: (r) => r._measurement == "device_telemetry")
                |> filter(fn: (r) => r["imei"] == "${imei}")
                |> last()
        `;

        const telemetry: Partial<DeviceTelemetry> = {};

        try {
            await new Promise<void>((resolve, reject) => {
                queryApi.queryRows(fluxQuery, {
                    next: (row, tableMeta) => {
                        const { _field, _value } = tableMeta.toObject(row);

                        // Make sure we handle telemetry fields based on the DeviceTelemetry structure
                        if (_field in telemetry) {
                            telemetry[_field as keyof DeviceTelemetry] = _value;
                        }
                    },
                    error: (error) => reject(error),
                    complete: () => resolve()
                });
            });

            return Object.keys(telemetry).length > 0 ? telemetry as DeviceTelemetry : null;
        } catch (error) {
            console.error(`Error retrieving latest telemetry for IMEI ${imei}:`, error);
            throw error;
        }
    }

    /**
     * Get telemetry history for a device by IMEI
     * @param imei The device IMEI
     * @param duration The time range for the history (default is -6h)
     * @returns The telemetry history for the device
     */
    static async getTelemetryHistory(imei: string, duration: string = '-6h'): Promise<DeviceTelemetry[]> {
        const fluxQuery = `
            from(bucket: "${influxConfig.telemetryBucket}")
                |> range(start: ${duration})
                |> filter(fn: (r) => r._measurement == "device_telemetry")
                |> filter(fn: (r) => r["imei"] == "${imei}")
        `;

        const telemetryHistory: DeviceTelemetry[] = [];

        try {
            await new Promise<void>((resolve, reject) => {
                queryApi.queryRows(fluxQuery, {
                    next: (row, tableMeta) => {
                        const result = tableMeta.toObject(row);

                        const telemetryPoint: DeviceTelemetry = {
                            imei: result.imei,
                            timestamp: result._time,
                            gps: result._gps,
                            elements: result._elements,
                            eventId: result.eventId

                        };
                        telemetryHistory.push(telemetryPoint);
                    },
                    error: (error) => reject(error),
                    complete: () => resolve()
                });
            });

            return telemetryHistory;
        } catch (error) {
            console.error(`Error retrieving telemetry history for IMEI ${imei}:`, error);
            throw error;
        }
    }
}
