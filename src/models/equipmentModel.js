const mongoose = require('mongoose');

// define schema for an Equipment document
const EquipmentSchema = new mongoose.Schema({
    equipId: { type: String, required: true, unique: true }, // minlength, maxlength
    name: { type: String, required: true, enum: ['Hard Hat', 'Left Boot', 'Right Boot'] },
    mac: {
        type: String,
        required: true,
        unique: true,
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
    assignedEmployeeId: { type: String },
    isWorn: { type: Boolean },
    safetyStatus: { type: String, enum: ['safe', 'warning', 'danger'] },
    latestX: { type: Number },
    latestY: { type: Number },
});

EquipmentSchema.set('timestamps', true);

// can't assign duplicate type of equipment to same employee
EquipmentSchema.index(
    { name: 1, assignedEmployeeId: 1 },
    { unique: true, partialFilterExpression: { assignedEmployeeId: { $type: 'string' } } },
);

module.exports = mongoose.model('Equipment', EquipmentSchema);
