const mongoose = require('mongoose');

// define schema for a Router document
const RouterSchema = new mongoose.Schema({
    // name: { type: String, required: true, enum: ['Hard Hat', 'Left Boot', 'Right Boot'] },
    ssid: { type: String, required: true },
    bssid: {
        type: String,
        required: true,
        unique: true,
        validate: (v) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
                    resolve(macRegex.test(v))
                }, 10);
            });
        }
    },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
});

RouterSchema.set('timestamps', true);

module.exports = mongoose.model('Router', RouterSchema);
