const mongoose = require('mongoose');

const WifiScanSchema = new mongoose.Schema({
    ssid: { type: String, required: true },
    bssid: {
        type: String,
        required: true,
        uppercase: true,
        validate: [{
            validator: v => new Promise((resolve) => {
                setTimeout(() => {
                    const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
                    resolve(macRegex.test(v));
                }, 10);
            }),
            msg: 'ssid must be of format XX:XX:XX:XX:XX:XX or XX-XX-XX-XX-XX-XX where X is a hexadecimal digit',
        }],
    },
    rssi: { type: Number, required: true },
});

// define schema for a Training document
const TrainingSchema = new mongoose.Schema({
    wifiScan: {
        type: [WifiScanSchema],
        required: true,
        validate: [{
            validator: v => new Promise((resolve) => {
                setTimeout(() => {
                    resolve(v.length > 2);
                }, 10);
            }),
            msg: 'wifiScan must be array of length 3 or more',
        }],
    },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
});

TrainingSchema.set('timestamps', true);

module.exports = mongoose.model('Training', TrainingSchema);
