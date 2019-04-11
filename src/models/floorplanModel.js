const mongoose = require('mongoose');

// define schema for a Floorplan document
const FloorplanSchema = new mongoose.Schema({
    data: { type: Buffer, required: true },
    contentType: { type: String, required: true },
    size: { type: Number, required: true },
    xScale: { type: Number, required: true },
    yScale: { type: Number, required: true },
});

FloorplanSchema.set('timestamps', true);

module.exports = mongoose.model('Floorplan', FloorplanSchema);
