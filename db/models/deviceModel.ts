import { Point } from '@influxdata/influxdb-client';

export interface ConnectedDevice {
    imei: string;
    ipAddress: string;
    port: number;
    connectedAt: Date;
    lastActiveAt: Date;
}

/**
 * Convert connected device data to InfluxDB point
 * @param device The connected device information
 * @returns InfluxDB point
 */
export function createConnectedDevicePoint(device: ConnectedDevice): Point {
    // Create a point with measurement name
    const point = new Point('connected_devices')
        .tag('imei', device.imei)
        .tag('ip_address', device.ipAddress)
        .intField('port', device.port)
        .timestamp(device.lastActiveAt);

    // Add the connection time as a field (time since connected in seconds)
    const connectionDuration =
        Math.floor((device.lastActiveAt.getTime() - device.connectedAt.getTime()) / 1000);
    point.intField('connection_duration', connectionDuration);

    // Add connection status field
    point.booleanField('connected', true);
    console.log(point);

    return point;
}