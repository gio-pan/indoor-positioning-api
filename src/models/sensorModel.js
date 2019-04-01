const mongoose = require('mongoose');

// define schema for an Sensor document
const SensorSchema = new mongoose.Schema({
    weightSensitivity: { type: Number },
    weightThreshold: { type: Number },
    temperatureSensitivity: { type: Number },
    temperatureThreshold: { type: Number },
});

SensorSchema.set('timestamps', true);

module.exports = mongoose.model('Sensor', SensorSchema);
