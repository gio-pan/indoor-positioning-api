const mongoose = require('mongoose');

const WifiScanSchema = new mongoose.Schema({
    ssid: { type: String, required: true },
    bssid: {
        type: String,
        required: true,
        validate: [{
            validator: v => new Promise((resolve) => {
                setTimeout(() => {
                    const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
                    resolve(macRegex.test(v));
                }, 10);
            }),
            msg: 'bssid must be of format XX:XX:XX:XX:XX:XX or XX-XX-XX-XX-XX-XX where X is a hexadecimal digit',
        }],
    },
    rssi: { type: Number, required: true },
    channel: { type: Number, required: true },
});

// define schema for a Location document
const LocationSchema = new mongoose.Schema({
    equipId: { type: String, required: true }, // minlength, maxlength
    name: { type: String, required: true, enum: ['Hard Hat', 'Left Boot', 'Right Boot'] },
    mac: {
        type: String,
        required: true,
        validate: [{
            validator: v => new Promise((resolve) => {
                setTimeout(() => {
                    const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
                    resolve(macRegex.test(v));
                }, 10);
            }),
            msg: 'mac must be of format XX:XX:XX:XX:XX:XX or XX-XX-XX-XX-XX-XX where X is a hexadecimal digit',
        }],
    },
    timeRecorded: { type: Date, required: true },
    wifiScan: { type: [WifiScanSchema], required: true },
    weightSensor: { type: Number, required: true },
    temperatureSensor: { type: Number, required: true },
    assignedEmployeeId: { type: String },
    isWorn: { type: Boolean },
    safetyStatus: { type: String, enum: ['safe', 'warning', 'danger'] },
    x: { type: Number },
    y: { type: Number },
});

LocationSchema.set('timestamps', true);

module.exports = mongoose.model('Location', LocationSchema);
