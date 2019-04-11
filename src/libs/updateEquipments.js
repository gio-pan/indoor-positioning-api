const Equipment = require('../models/equipmentModel');
const calculateSafety = require('../libs/calculateSafety');

const updateAllStatus = async (boundaries, io) => {
    try {
        const equipments = await Equipment.find({
            isWorn: false,
            latestX: { $exists: true },
            latestY: { $exists: true },
        });
        // console.log(equipments);
        const updatedEquipments = [];
        await Promise.all(equipments.map(async (equipment) => {
            const x = equipment.latestX;
            const y = equipment.latestY;
            const safetyStatus = calculateSafety.positionStatus(x, y, boundaries);
            const updatedEquipment = await Equipment.findOneAndUpdate(
                { mac: equipment.mac },
                { $set: { safetyStatus: safetyStatus }, $inc: { __v: 1 } },
                { new: true, runValidators: true }, // new: return updated document
            );
            updatedEquipments.push(updatedEquipment);
        }));

        io.emit('tagLocationUpdate', updatedEquipments);
    } catch (err) {
        console.log(`${err.name}: ${err.message}`);
    }
};

const updateSingle = async (mac, updates, io) => {
    try {
        const updatedEquipment = await Equipment.findOneAndUpdate(
            { mac: mac },
            { $set: updates, $inc: { __v: 1 } },
            { new: true, runValidators: true }, // new: return updated document
        );
        // check mac/equipId in system
        // get assignedEmployeeId?
        if (updatedEquipment !== null) {
            io.emit('tagLocationUpdate', [updatedEquipment]);
        }

        return updatedEquipment;
    } catch (err) {
        console.log(`${err.name}: ${err.message}`);
        throw new Error(`${err.name}: ${err.message}`);
    }
};

module.exports = {
    updateAllStatus,
    updateSingle,
};
