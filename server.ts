import * as net from 'net';
import { TeltonikaParser } from './TeltonikaParser/teltonikaParser';
import {lastMapParameters, mapParameters} from './parameterMapper';

type DeviceInfo = {
    socket: net.Socket;
    imei?: string;
};

const devices = new Map<string, DeviceInfo>();

const server = net.createServer((socket: net.Socket) => {
    const connId = `${socket.remoteAddress}:${socket.remotePort}`;
    console.log(`New connection: ${connId}`);

    devices.set(connId, { socket });

    socket.on('data', (data: Buffer) => {
        try {
            const result = TeltonikaParser.processPacket(data);
            const device = devices.get(connId);
            if (!device) return;

            if (result.type === 'imei') {
                device.imei = result.imei;
                console.log(`IMEI : ${result.imei}`);
            } else if (result.data.CodecType === 'data sending') {
                // Type guard to ensure we have Data type
                const content = result.data.Content as { AVL_Datas?: any[] };

                if (content.AVL_Datas) {

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
                    // // Log both original and mapped data
                    // content.AVL_Datas.forEach(avl => {
                    //     console.log(`[${device.imei}] Original Data:`, {
                    //         timestamp: avl.Timestamp,
                    //         gps: avl.GPSelement,
                    //         io: avl.IOelement
                    //     });
                    // });

                    console.log(`${device.imei}:`, mappedData);
                    console.log(`${device.imei} lastest Data:`, lastestMappedData);

                }
            }
        } catch (error) {
            console.error(`Error from ${connId}:`, error instanceof Error ? error.message : error);
        }
    });

    socket.on('close', () => {
        console.log(`Connection closed: ${connId}`);
        devices.delete(connId);
    });

    socket.on('error', (err: Error) => {
        console.error(`Socket error on ${connId}:`, err.message);
    });
});


const PORT = 5025;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

