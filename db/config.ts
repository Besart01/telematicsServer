import { InfluxDB } from '@influxdata/influxdb-client';

// InfluxDB connection configuration
export const influxConfig = {
    url: process.env.INFLUX_URL || 'http://localhost:8086',
    token: process.env.INFLUX_TOKEN || 'zDyFJTCDF80hzYcey_a90VDNuXnzu4D7JZOYK4hSoruEGvYKPe7HGkCB5TaSPnKNM0qweiU9DscllEY8uXZleg==',
    org: process.env.INFLUX_ORG || 'Intelory',
    bucket: process.env.INFLUX_BUCKET || 'trackingDevices',
    telemetryBucket: process.env.INFLUX_TELEMETRY_BUCKET || 'telemetryDevices'
};

console.log("Using InfluxDB token:", influxConfig.token);

// Create InfluxDB client instance
export const influxClient = new InfluxDB({
    url: influxConfig.url,
    token: influxConfig.token
});

// Create a write API client
export const writeApi = influxClient.getWriteApi(
    influxConfig.org,
    influxConfig.bucket,
    'ns'
);


export const telemetryWriteApi = influxClient.getWriteApi(
    influxConfig.org,
    influxConfig.telemetryBucket,
    'ns'
);

export const telemetryQueryApi = influxClient.getQueryApi(influxConfig.org);

// Create a query API client
export const queryApi = influxClient.getQueryApi(influxConfig.org);