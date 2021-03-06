const mongoose = require('mongoose');

// define schema for a Router document
const RouterSchema = new mongoose.Schema({
    ssid: { type: String, required: true },
    bssid: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
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
    x: { type: Number, required: true },
    y: { type: Number, required: true },
});

RouterSchema.set('timestamps', true);

module.exports = mongoose.model('Router', RouterSchema);
