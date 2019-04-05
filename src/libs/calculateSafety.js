const Sensor = require('../models/sensorModel');
const isInsidePolygon = require('../libs/isInsidePolygon');

// TODO:
const isWorn = async (weightSensor) => {
    try {
        const sensorConfig = await Sensor.findOne({});
        if (sensorConfig === null) {
            console.log('NO SENSOR CONFIGURATION: isWorn WILL ALWAYS BE FALSE');
            return false;
        }
        const { weightThreshold } = sensorConfig;
        if (typeof weightThreshold !== 'undefined' && weightSensor > weightThreshold) {
            return true;
        }
        return false;
    } catch (e) {
        return false;
    }
};

const positionStatus = (x, y, boundaries) => {
    // all areas safe if no boundaries or invalid position
    if (x === null || y === null || !Array.isArray(boundaries)) {
        return 'safe';
    }
    let currentSafetyStatus = 'safe';
    boundaries.forEach((boundary) => {
        const { vertices, safetyLevel } = boundary;
        if (safetyLevel !== 'safe' && isInsidePolygon(vertices, { x: x, y: y })) {
            if ((safetyLevel === 'warning' && currentSafetyStatus === 'safe')
                || safetyLevel === 'danger') {
                currentSafetyStatus = safetyLevel;
            }
        }
    });
    return currentSafetyStatus;
};

module.exports = {
    isWorn,
    positionStatus,
};
