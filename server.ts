import * as net from 'net';
import { ConnectionHandlers } from './connectionHandlers';

type DeviceInfo = {
    socket: net.Socket;
    imei?: string;
    connectedAt: Date;
    lastActiveAt: Date;
};

const devices = new Map<string, DeviceInfo>();

const server = net.createServer((socket: net.Socket) => {
    const connId = `${socket.remoteAddress}:${socket.remotePort}`;
    console.log(`New connection: ${connId}`);

    // Log connection details (optional)
    logConnectionDetails(socket);

    const now = new Date();
    devices.set(connId, {
        socket,
        connectedAt: now,
        lastActiveAt: now
    });

    socket.on('data', async (data: Buffer) => {
        await ConnectionHandlers.handleData(data, socket, connId, devices);
    });

    socket.on('close', async () => {
        await ConnectionHandlers.handleClose(connId, socket, devices);
    });

    socket.on('error', (err: Error) => {
        ConnectionHandlers.handleError(err, connId);
    });
});

// Helper function for logging connection details
function logConnectionDetails(socket: net.Socket) {
    console.log('--- Socket Connection Details ---');
    console.log(`Remote Address   : ${socket.remoteAddress}`);
    console.log(`Remote Port      : ${socket.remotePort}`);
    console.log(`Remote Family    : ${socket.remoteFamily}`);
    console.log(`Local Address    : ${socket.localAddress}`);
    console.log(`Local Port       : ${socket.localPort}`);
    console.log('----------------------------------');
    console.log(`Bytes Read       : ${socket.bytesRead}`);
    console.log(`Bytes Written    : ${socket.bytesWritten}`);
    console.log(`Timeout          : ${socket.timeout}`);
    console.log(`Ready State      : ${socket.readyState}`);
    console.log(`Allow Half Open  : ${socket.allowHalfOpen}`);
    console.log(`Readable         : ${socket.readable}`);
    console.log(`Writable         : ${socket.writable}`);
    console.log('----------------------------------');
}

const PORT = 5025;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
