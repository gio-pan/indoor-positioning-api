const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
    x: { type: Number, required: true },
    y: { type: Number, required: true },
}, { _id: false });


const BoundarySchema = new mongoose.Schema({
    vertices: {
        type: [PointSchema],
        required: true,
        validate: [{
            validator: v => new Promise((resolve) => {
                setTimeout(() => {
                    resolve(v.length > 2);
                }, 10);
            }),
            msg: 'vertices must be array of x,y coordinates of length 3 or more',
        }],
    },
    safetyLevel: { type: String, enum: ['safe', 'warning', 'danger'] },
});

// define schema for an Geofence document
const GeofenceSchema = new mongoose.Schema({
    boundaries: {
        type: [BoundarySchema],
        required: true,
        validate: [{
            validator: v => v.length > 0,
            msg: 'boundaries must be an array',
        }],
    },
});

GeofenceSchema.set('timestamps', true);

module.exports = mongoose.model('Geofence', GeofenceSchema);
