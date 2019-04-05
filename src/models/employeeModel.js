const mongoose = require('mongoose');
// const EquipmentSchema = require('../models/equipmentModel').schema;

// define schema for an Employee document
const EmployeeSchema = new mongoose.Schema({
    employeeId: { type: String, required: true, unique: true }, // minlength, maxlength
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'manager', 'worker'] },
    // company, unit, etc?
});

// both of the following work to specify error messages for required fields
// required: 'some error message'
// required: [true, 'some error message']

EmployeeSchema.set('timestamps', true);

module.exports = mongoose.model('Employee', EmployeeSchema);
