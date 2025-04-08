
export const codecElements: { [key: string]: string } = {
    '0': 'digitalInput1',
    '2': 'digitalInput2',
    '3': 'digitalInput3',
    '4': 'pulseCounterDin1',
    '9': 'analogInput1',
    '10': 'sdStatus',
    '11': 'iccid1',
    '13': 'fuelRateGps',
    '15': 'ecoScore',
    '16': 'totalOdometer',
    '17': 'axisX',
    '18': 'axisY',
    '19': 'axisZ',
    '21': 'gsmSignal',
    '22': 'bleBattery3',
    '24': 'speed',
    '25': 'bleTemperature1',
    '26': 'bleTemperature2',
    '27': 'bleTemperature3',
    '28': 'bleTemperature4',
    '29': 'bleBattery1',
    '30': 'numberOfDtc',
    '31': 'engineLoad',
    '32': 'coolantTemperature',
    '33': 'shortFuelTrim',
    '34': 'fuelPressure',
    '35': 'intakeMap',
    '36': 'engineRpm',
    '37': 'vehicleSpeed',
    '38': 'timingAdvance',
    '39': 'intakeAirTemperature',
    '40': 'maf',
    '41': 'throttlePosition',
    '42': 'runtimeSinceEngineStart',
    '43': 'distanceTraveledMilOn',
    '44': 'relativeFuelRailPressure',
    '45': 'directFuelRailPressure',
    '46': 'commandedEgr',
    '47': 'egrError',
    '48': 'fuelLevel',
    '49': 'distanceSinceCodesClear',
    '50': 'barometricPressure',
    '51': 'controlModuleVoltage',
    '52': 'absoluteLoadValue',
    '53': 'ambientAirTemperature',
    '54': 'timeRunWithMilOn',
    '55': 'timeSinceCodesCleared',
    '56': 'absoluteFuelRailPressure',
    '57': 'hybridBatteryPackLife',
    '58': 'engineOilTemperature',
    '59': 'fuelInjectionTiming',
    '66': 'externalVoltage',
    '67': 'batteryVoltage',
    '68': 'batteryCurrent',
    '69': 'gnssStatus',
    '71': 'dallasTemperatureId4',
    '72': 'dallasTemperature1',
    '73': 'dallasTemperature2',
    '74': 'dallasTemperature3',
    '75': 'dallasTemperature4',
    '76': 'dallasTemperatureId1',
    '77': 'dallasTemperatureId2',
    '78': 'iButton',
    '79': 'dallasTemperatureId3',
    '80': 'dataMode',
    '81': 'vehicleSpeedKmH',
    '82': 'acceleratorPedalPosition%',
    '84': 'fuelLevelL',
    '85': 'engineRpmRpm',
    '86': 'bleHumidity1',
    '87': 'totalMileageM',
    '89': 'fuelLevel%',
    '90': 'doorStatus',
    '103': 'engineWorktimeMin',
    '104': 'bleHumidity2',
    '105': 'totalMileageCountedM',
    '106': 'bleHumidity3',
    '107': 'fuelConsumedCountedL',
    '108': 'bleHumidity4',
    '110': 'fuelRate',
    '113': 'batteryLevel',
    '115': 'engineTemperature°C',
    '123': 'newPropertyName',
    '152': 'batteryLevel%',
    '168': 'batteryVoltageV',
    '179': 'digitalOutput1',
    '180': 'digitalOutput2',
    '181': 'gnssPdop',
    '182': 'gnssHdop',
    '199': 'tripOdometer',
    '200': 'sleepMode',
    '201': 'lls1FuelLevel',
    '202': 'lls1Temperature',
    '203': 'lls2FuelLevel',
    '204': 'lls2Temperature',
    '205': 'gsmCellId',
    '206': 'gsmAreaCode',
    '207': 'rfid',
    '210': 'lls3FuelLevel',
    '211': 'lls3Temperature',
    '212': 'lls4FuelLevel',
    '213': 'lls4Temperature',
    '214': 'lls5FuelLevel',
    '215': 'lls5Temperature',
    '237': 'networkType',
    '238': 'userId',
    '239': 'ignition',
    '240': 'movement',
    '241': 'activeGsmOperator',
    '255': 'overSpeeding',
    '256': 'VIN',
    '263': 'btStatus',
    '264': 'barcodeId',
    '269': 'escortLlsTemperature1',
    '270': 'bleFuelLevel1',
    '271': 'escortLlsFuelLevel1',
    '272': 'escortLlsBatteryVoltage1',
    '273': 'bleFuelLevel2',
    '274': 'escortLlsTemperature2',
    '275': 'escortLlsFuelLevel2',
    '276': 'bleFuelLevel3',
    '277': 'escortLlsTemperature3',
    '278': 'escortLlsFuelLevel3',
    '279': 'bleFuelLevel4',
    '280': 'escortLlsTemperature4',
    '281': 'escortLlsFuelLevel4',
    '303': 'instantMovement',
    '306': 'bleFuelFrequency1',
    '307': 'bleFuelFrequency2',
    '308': 'bleFuelFrequency3',
    '309': 'bleFuelFrequency4',
    '327': 'ul20202SensorFuelLevel',
    '331': 'ble1Custom1',
    '332': 'ble2Custom1',
    '333': 'ble3Custom1',
    '335': 'bleLuminosity1',
    '336': 'bleLuminosity2',
    '337': 'bleLuminosity3',
    '338': 'bleLuminosity4',
    '380': 'digitalOutput3',
    '381': 'groundSense',
    '385': 'beacon',
    '387': 'iso6709Coordinates',
    '389': 'obdOemTotalMileage',
    '390': 'obdOemFuelLevel',
    '400': 'distanceToNextService',
    '403': 'driverName',
    '404': 'driverCardLicenseType',
    '405': 'driverGender',
    '406': 'driverCardId',
    '407': 'driverCardExpirationDate',
    '408': 'driverCardPlaceOfIssue',
    '409': 'driverStatusEvent',
    '451': 'bleRfid1',
    '452': 'bleRfid2',
    '453': 'bleRfid3',
    '454': 'bleRfid4',
    '455': 'bleButton1State1',
    '456': 'bleButton1State2',
    '457': 'bleButton1State3',
    '458': 'bleButton1State4',
    '459': 'bleButton2State1',
    '460': 'bleButton2State2',
    '461': 'bleButton2State3',
    '462': 'bleButton2State4',
    '622': 'frequencyDin1',
    '623': 'frequencyDin2',
    '10800': 'eyeTemperature1',
    '10801': 'eyeTemperature2',
    '10802': 'eyeTemperature3',
    '10803': 'eyeTemperature4',
    '10804': 'eyeHumidity1',
    '10805': 'eyeHumidity2',
    '10806': 'eyeHumidity3',
    '10807': 'eyeHumidity4',
    '10808': 'eyeMagnet1',
    '10809': 'eyeMagnet2',
    '10810': 'eyeMagnet3',
    '10811': 'eyeMagnet4',
    '10812': 'eyeMovement1',
    '10813': 'eyeMovement2',
    '10814': 'eyeMovement3',
    '10815': 'eyeMovement4',
    '10816': 'eyePitch1',
    '10817': 'eyePitch2',
    '10818': 'eyePitch3',
    '10819': 'eyePitch4',
    '10820': 'eyeLowBattery1',
    '10821': 'eyeLowBattery2',
    '10822': 'eyeLowBattery3',
    '10823': 'eyeLowBattery4',
    '10824': 'eyeBatteryVoltage1',
    '10825': 'eyeBatteryVoltage2',
    '10826': 'eyeBatteryVoltage3',
    '10827': 'eyeBatteryVoltage4',
    '10832': 'eyeRoll1',
    '10833': 'eyeRoll2',
    '10834': 'eyeRoll3',
    '10835': 'eyeRoll4',
    '10836': 'eyeMovementCount1',
    '10837': 'eyeMovementCount2',
    '10838': 'eyeMovementCount3',
    '10839': 'eyeMovementCount4',
    '10840': 'eyeMagnetCount1',
    '10841': 'eyeMagnetCount2',
    '10842': 'eyeMagnetCount3',
    '10843': 'eyeMagnetCount4',
    '383': 'axlCalibrationStatus'

};

function toCamelCase(str: string): string {
    return str.replace(/([-_][a-z])/gi, ($1) => {
        return $1.toUpperCase().replace('-', '').replace('_', '');
    }).replace(/^[A-Z]/, (firstChar) => firstChar.toLowerCase());
}

function convertKeysToCamelCase(obj: any): any {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => convertKeysToCamelCase(item));
    }

    return Object.keys(obj).reduce((acc, key) => {
        const camelKey = toCamelCase(key);
        acc[camelKey] = convertKeysToCamelCase(obj[key]);
        return acc;
    }, {} as Record<string, any>);
}

export function mapParameters(data: {
    timestamp: Date;
    gps: any;
    io: {
        EventID: number;
        ElementCount: number;
        Elements: { [key: string]: any };
    };
}[]) {
    return data.map(item => {
        const elements = item.io.Elements || {};
        const gpsData = item.gps || {};
        const elementFields: { [key: string]: any } = {};

        for (const key in elements) {
            const fieldName = codecElements[key] || toCamelCase(key);
            elementFields[fieldName] = elements[key];
        }

        return {
            timestamp: item.timestamp,
            gps: convertKeysToCamelCase(gpsData),
            elements: convertKeysToCamelCase(elementFields),
            eventId: item.io.EventID
        };
    });
}


export function lastMapParameters(data: {
    timestamp: Date;
    gps: any;
    io: {
        EventID: number;
        ElementCount: number;
        Elements: { [key: string]: any };
    };
}[]) {
    if (data.length === 0) return null;  // Handle empty array case

    const item = data[0];  // Take the first item
    const elements = item.io.Elements || {};
    const gpsData = item.gps || {};
    const elementFields: { [key: string]: any } = {};

    for (const key in elements) {
        const fieldName = codecElements[key] || toCamelCase(key);
        elementFields[fieldName] = elements[key];
    }

    return {
        timestamp: item.timestamp,
        gps: convertKeysToCamelCase(gpsData),
        elements: convertKeysToCamelCase(elementFields),
        eventId: item.io.EventID
    };
}


export function getParameterName(id: string): string | undefined {
    return codecElements[id];
}