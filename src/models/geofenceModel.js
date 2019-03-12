const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
    x: {type: Number, required: true},
    y: {type: Number, required: true},
}, { _id: false });

// define schema for an Geofence document
const GeofenceSchema = new mongoose.Schema({
    vertices: {
        type: [PointSchema],
        required: true,
        validate: (v) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(v.length > 2)
                }, 10);
            });
        }
    },
    safetyLevel: { type: String, enum: ['safe', 'warning', 'danger'] },
});

GeofenceSchema.set('timestamps', true);

module.exports = mongoose.model('Geofence', GeofenceSchema);
