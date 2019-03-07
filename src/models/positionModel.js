const mongoose = require('mongoose');

// define schema for a Position document
const PositionSchema = new mongoose.Schema({
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Position', PositionSchema);
