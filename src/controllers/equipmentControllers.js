const Equipment = require('../models/equipmentModel');
const Employee = require('../models/employeeModel');
const errorResponse = require('../libs/errorHandler');

// create document for a equipment in db
// use schema defined in models/equipmentModel.js
const equipmentAdd = async (req, res) => {
    const equipment = new Equipment({
        equipId: req.body.equipId,
        name: req.body.name,
        mac: req.body.mac,
        assignedEmployeeId: req.body.assignedEmployeeId,
        x: req.body.x,
        y: req.body.y,
    });

    // using mongoose
    try {
        const newEquipment = await equipment.save();
        res.set('Location', `${req.protocol}://${req.hostname}${req.baseUrl}/get/${equipment.equipId}`)
        res.status(201).json({
            message: `Added equipment with equipId = ${equipment.equipId}`,
        });
    } catch (err) {
        errorResponse(err, res);
    }
};

// get all equipment documents
const equipmentGetAll = async (req, res) => {
    try {
        const equipments = await Equipment.find({}); // sort?
        res.status(200).json(equipments);
    } catch (err) {
        errorResponse(err, res);
    }
};

// get equipment document by equipId
const equipmentGetByEquipId = async (req, res) => {
    try {
        const equipment = await Equipment.findOne({ equipId: req.params.equipId });
        if (equipment === null) {
            res.status(404).json({
                message: `Could not find equipment with equipId = ${req.params.equipId}`,
            });
            return;
        }
        res.status(200).json(equipment);
    } catch (err) {
        errorResponse(err, res);
    }
};

// update equipment document by equipId
const equipmentUpdateByEquipId = async (req, res) => {
    try {
        if (req.body.assignedEmployeeId !== undefined) {
            // if assignedEmployeeId is in update, check if assignedEmployeeId is valid (exists in employees collection)
            const employee = await Employee.findOne({ employeeId: req.body.assignedEmployeeId });
            if (employee === null) {
                res.status(404).json({
                    message: `Could not find employee with employeeId = ${req.body.assignedEmployeeId}`,
                });
                return;
            }
        }
        const equipment = await Equipment.findOneAndUpdate(
            { equipId: req.params.equipId },
            { $set: req.body, $inc: { __v: 1 } },
            { new: true, runValidators: true }, // new: return updated document instead of original
        );
        if (equipment === null) {
            res.status(404).json({
                message: `Could not find equipment with equipId = ${req.params.equipId}`,
            });
            return;
        }
        res.status(200).json({
            message: `Updated equipment with equipId = ${req.params.equipId}`,
            updatedObject: equipment,
        });
    } catch (err) {
        errorResponse(err, res);
    }
};

// pair equipment to employeeId by equipId
const equipmentPairByEquipId = async (req, res) => {
    try {
        // check if desired employeeId is in req.body
        if (req.body.employeeId === undefined) {
            res.status(400).json({
                message: 'Request body does not contain field employeeId = employeeId to pair equipId with',
            });
            return;
        }
        // check if employeeId is valid (exists in employees collection)
        const employee = await Employee.findOne({ employeeId: req.body.employeeId });
        if (employee === null) {
            res.status(404).json({
                message: `Could not find employee with employeeId = ${req.body.employeeId}`,
            });
            return;
        }
        const equipment = await Equipment.findOneAndUpdate(
            { equipId: req.params.equipId },
            { $set: { assignedEmployeeId: req.body.employeeId } , $inc: { __v: 1 } },
            { new: true, runValidators: true }, // new: return updated document instead of original
        );
        if (equipment === null) {
            res.status(404).json({
                message: `Could not find equipment with equipId = ${req.params.equipId}`,
            });
            return;
        }
        res.status(200).json({
            message: `Paired equipment with equipId = ${req.params.equipId} to employee with employeeId = ${req.body.employeeId}`,
            updatedObject: equipment,
        });
    } catch (err) {
        errorResponse(err, res);
    }
};

// delete equipment document by equipId
const equipmentDeleteByEquipId = async (req, res) => {
    try {
        const equipment = await Equipment.findOneAndDelete({ equipId: req.params.equipId });
        // delete location history?
        if (equipment === null) {
            res.status(404).json({
                message: `Could not find equipment with equipId = ${req.params.equipId}`,
            });
            return;
        }
        res.status(200).json({
            message: `Deleted equipment with equipId = ${req.params.equipId}`,
            deletedObject: equipment,
        });
    } catch (err) {
        errorResponse(err, res);
    }
};

module.exports = {
    equipmentAdd,
    equipmentGetAll,
    equipmentGetByEquipId,
    equipmentUpdateByEquipId,
    equipmentPairByEquipId,
    equipmentDeleteByEquipId,
};
