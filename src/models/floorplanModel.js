const mongoose = require('mongoose');

// define schema for a Floorplan document
const FloorplanSchema = new mongoose.Schema({
    data: { type: Buffer, required: true },
    contentType: { type: String },
});

FloorplanSchema.set('timestamps', true);

module.exports = mongoose.model('Floorplan', FloorplanSchema);
