const Employee = require('../models/employeeModel');
const errorResponse = require('../libs/errorHandler');

// create document for a employee in db
// use schema defined in models/employeeModel.js
const employeeAdd = async (req, res) => {
    const employee = new Employee({
        employeeId: req.body.employeeId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role,
        // status: req.body.status,
        // equipIds: req.body.equipIds,
    });

    // using mongoose
    try {
        const newEmployee = await employee.save();
        res.set('Location', `${req.protocol}://${req.hostname}${req.baseUrl}/get/${employee.employeeId}`)
        res.status(201).json({
            message: `Added employee with employeeId = ${employee.employeeId}`,
        });
    } catch (err) {
        errorResponse(err, res);
    }
};

// get all employee documents
const employeeGetAll = async (req, res) => {
    try {
        const employees = await Employee.find({}); // sort?
        res.status(200).json(employees);
    } catch (err) {
        errorResponse(err, res);
    }
};

// get employee document by employeeId
const employeeGetByEmployeeId = async (req, res) => {
    try {
        const employee = await Employee.findOne({ employeeId: req.params.employeeId });
        if (employee === null) {
            res.status(404).json({
                message: `Could not find employee with employeeId = ${req.params.employeeId}`,
            });
            return;
        }
        res.status(200).json(employee);
    } catch (err) {
        errorResponse(err, res);
    }
};

// update employee document by employeeId
const employeeUpdateByEmployeeId = async (req, res) => {
    try {
        const employee = await Employee.findOneAndUpdate(
            { employeeId: req.params.employeeId },
            { $set: req.body, $inc: { __v: 1 } },
            { new: true, runValidators: true }, // new: return updated document instead of original
        );
        if (employee === null) {
            res.status(404).json({
                message: `Could not find employee with employeeId = ${req.params.employeeId}`,
            });
            return;
        }
        res.status(200).json({
            message: `Updated employee with employeeId = ${req.params.employeeId}`,
            updatedObject: employee,
        });
    } catch (err) {
        errorResponse(err, res);
    }
};

// delete employee document by employeeId
const employeeDeleteByEmployeeId = async (req, res) => {
    try {
        const employee = await Employee.findOneAndDelete({ employeeId: req.params.employeeId });
        // delete location history?
        // unpair equipment
        if (employee === null) {
            res.status(404).json({
                message: `Could not find employee with employeeId = ${req.params.employeeId}`,
            });
            return;
        }
        res.status(200).json({
            message: `Deleted employee with employeeId = ${req.params.employeeId}`,
            deletedObject: employee,
        });
    } catch (err) {
        errorResponse(err, res);
    }
};

module.exports = {
    employeeAdd,
    employeeGetAll,
    employeeGetByEmployeeId,
    employeeUpdateByEmployeeId,
    employeeDeleteByEmployeeId,
};
