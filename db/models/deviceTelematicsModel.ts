// import { Point } from '@influxdata/influxdb-client';
//
// export interface GpsData {
//     longitude: number;
//     latitude: number;
//     altitude: number;
//     angle: number;
//     satellites: number;
//     speed: number;
// }
//
// export interface DeviceElements {
//     fuelRateGps?: number;
//     totalOdometer?: number;
//     gsmSignal?: number;
//     speed?: number;
//     externalVoltage?: number;
//     batteryVoltage?: number;
//     batteryCurrent?: number;
//     gnssStatus?: number;
//     gnssPdop?: number;
//     gnssHdop?: number;
//     tripOdometer?: number;
//     sleepMode?: number;
//     ignition?: number;
//     movement?: number;
//     activeGsmOperator?: number;
//     instantMovement?: number;
//     // OBD-II fields
//     numberOfDtc?: number;
//     engineLoad?: number;
//     coolantTemperature?: number;
//     engineRpm?: number;
//     vehicleSpeed?: number;
//     timingAdvance?: number;
//     intakeAirTemperature?: number;
//     distanceTraveledMilOn?: number;
//     ambientAirTemperature?: number;
//     engineOilTemperature?: number;
//     vIN?: string;
//     obdOemTotalMileage?: number;
//     obdOemFuelLevel?: number;
// }
//
// export interface DeviceTelemetry {
//     imei: string;
//     timestamp: Date;
//     gps: GpsData;
//     elements: DeviceElements;
//     eventId: number;
//
// }
//
// /**
//  * Convert telemetry data to InfluxDB point
//  * @param telemetry The device telemetry information
//  * @returns InfluxDB point
//  */
// export function createTelemetryPoint(telemetry: DeviceTelemetry): Point {
//     const point = new Point('device_telemetry')
//         .tag('imei', telemetry.imei)
//         .tag('event_id', telemetry.eventId.toString())
//         .timestamp(telemetry.timestamp);
//
//     // GPS data
//     point.floatField('longitude', telemetry.gps.longitude)
//         .floatField('latitude', telemetry.gps.latitude)
//         .floatField('altitude', telemetry.gps.altitude)
//         .floatField('angle', telemetry.gps.angle)
//         .intField('satellites', telemetry.gps.satellites)
//         .floatField('gpsSpeed', telemetry.gps.speed);
//
//
//     // Device elements
//     const elements = telemetry.elements;
//     if (elements.fuelRateGps !== undefined) point.intField('fuelRate', elements.fuelRateGps);
//     if (elements.totalOdometer !== undefined) point.intField('totalOdometer', elements.totalOdometer);
//     if (elements.gsmSignal !== undefined) point.intField('gsmSignal', elements.gsmSignal);
//     if (elements.speed !== undefined) point.floatField('speed', elements.speed);
//     if (elements.externalVoltage !== undefined) point.intField('externalVoltage', elements.externalVoltage);
//     if (elements.batteryVoltage !== undefined) point.intField('batteryVoltage', elements.batteryVoltage);
//     if (elements.batteryCurrent !== undefined) point.intField('batteryCurrent', elements.batteryCurrent);
//     if (elements.gnssStatus !== undefined) point.intField('gnssStatus', elements.gnssStatus);
//     if (elements.gnssPdop !== undefined) point.intField('gnssPdop', elements.gnssPdop);
//     if (elements.gnssHdop !== undefined) point.intField('gnssHdop', elements.gnssHdop);
//     if (elements.tripOdometer !== undefined) point.intField('tripOdometer', elements.tripOdometer);
//     if (elements.sleepMode !== undefined) point.booleanField('sleepMode', elements.sleepMode === 1);
//     if (elements.ignition !== undefined) point.booleanField('ignition', elements.ignition === 1);
//     if (elements.movement !== undefined) point.booleanField('movement', elements.movement === 1);
//     if (elements.instantMovement !== undefined) point.booleanField('instantMovement', elements.instantMovement === 1);
//
//     // OBD-II specific fields
//     if (elements.numberOfDtc !== undefined) point.intField('dtcCount', elements.numberOfDtc);
//     if (elements.engineLoad !== undefined) point.floatField('engineLoad', elements.engineLoad);
//     if (elements.coolantTemperature !== undefined) point.floatField('coolantTemperature', elements.coolantTemperature);
//     if (elements.engineRpm !== undefined) point.floatField('engineRpm', elements.engineRpm);
//     if (elements.vehicleSpeed !== undefined) point.floatField('vehicleSpeed', elements.vehicleSpeed);
//     if (elements.timingAdvance !== undefined) point.floatField('timingAdvance', elements.timingAdvance);
//     if (elements.intakeAirTemperature !== undefined) point.floatField('intakeAirTemperature', elements.intakeAirTemperature);
//     if (elements.distanceTraveledMilOn !== undefined) point.floatField('distanceTraveledMilOn', elements.distanceTraveledMilOn);
//     if (elements.ambientAirTemperature !== undefined) point.floatField('ambientAirTemperature', elements.ambientAirTemperature);
//     if (elements.engineOilTemperature !== undefined) point.floatField('engineOilTemperature', elements.engineOilTemperature);
//
//     return point;
// }



// import { Point } from '@influxdata/influxdb-client';
// import { codecElements } from '../../parameterMapper';
//
// // Generate DeviceElements interface dynamically from codecElements
// type ElementValueType = number | string | boolean; // Define possible value types
//
// // Create a type that has all the properties from codecElements as optional fields
// export type DeviceElements = {
//     [K in typeof codecElements[keyof typeof codecElements]]?: ElementValueType;
// };
//
// export interface GpsData {
//     longitude: number;
//     latitude: number;
//     altitude: number;
//     angle: number;
//     satellites: number;
//     speed: number;
// }
//
// export interface DeviceTelemetry {
//     imei: string;
//     timestamp: Date;
//     gps: GpsData;
//     elements: DeviceElements;
//     eventId: number;
// }
//
// /**
//  * Convert telemetry data to InfluxDB point
//  * @param telemetry The device telemetry information
//  * @returns InfluxDB point
//  */
// export function createTelemetryPoint(telemetry: DeviceTelemetry): Point {
//     const point = new Point('device_telemetry')
//         .tag('imei', telemetry.imei)
//         .tag('event_id', telemetry.eventId.toString())
//         .timestamp(telemetry.timestamp);
//
//     // GPS data
//     point.floatField('longitude', telemetry.gps.longitude)
//         .floatField('latitude', telemetry.gps.latitude)
//         .floatField('altitude', telemetry.gps.altitude)
//         .floatField('angle', telemetry.gps.angle)
//         .intField('satellites', telemetry.gps.satellites)
//         .floatField('speed', telemetry.gps.speed);
//
//     // Device elements - Dynamically add fields based on what's present
//     const elements = telemetry.elements;
//
//     // Helper function to determine appropriate field type based on value
//     const addFieldByType = (name: string, value: any) => {
//         if (value === undefined || value === null) return;
//
//         if (typeof value === 'boolean') {
//             point.booleanField(name, value);
//         } else if (typeof value === 'number') {
//             // Check if the value is likely a float or integer
//             if (Number.isInteger(value)) {
//                 point.intField(name, value);
//             } else {
//                 point.floatField(name, value);
//             }
//         } else if (typeof value === 'string') {
//             point.stringField(name, value);
//         }
//     };
//
//     // Special cases where we know the field should be boolean
//     const booleanFields = ['sleepMode', 'ignition', 'movement', 'instantMovement'];
//
//     // Add all fields from elements dynamically
//     for (const key in elements) {
//         if (elements.hasOwnProperty(key)) {
//             // Handle special boolean cases
//             if (booleanFields.includes(key) && typeof elements[key] === 'number') {
//                 point.booleanField(key, elements[key] === 1);
//             } else {
//                 addFieldByType(key, elements[key]);
//             }
//         }
//     }
//
//     return point;
// }



import { Point } from '@influxdata/influxdb-client';
import { codecElements } from '../../parameterMapper';

type ElementValueType = number | string;

export type DeviceElements = {
    [K in typeof codecElements[keyof typeof codecElements]]?: ElementValueType;
};

export interface GpsData {
    longitude: number;
    latitude: number;
    altitude: number;
    angle: number;
    satellites: number;
    speed: number;
}

export interface DeviceTelemetry {
    imei: string;
    timestamp: Date;
    gps: GpsData;
    elements: DeviceElements;
    eventId: number;
}

export function createTelemetryPoint(telemetry: DeviceTelemetry): Point {
    const point = new Point('device_telemetry')
        .tag('imei', telemetry.imei)
        .tag('event_id', telemetry.eventId.toString())
        .timestamp(telemetry.timestamp);

    // Add GPS data
    const { longitude, latitude, altitude, angle, satellites, speed } = telemetry.gps;
    point.floatField('longitude', longitude)
        .floatField('latitude', latitude)
        .floatField('altitude', altitude)
        .floatField('angle', angle)
        .intField('satellites', satellites)
        .floatField('speed', speed);

    // Add dynamic elements (optimized)
    Object.entries(telemetry.elements).forEach(([key, value]) => {
        if (value == null) return;
        if (typeof value === 'number') {
            point[Number.isInteger(value) ? 'intField' : 'floatField'](key, value);
        } else {
            point.stringField(key, value);
        }
    });

    return point;
}