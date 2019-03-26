const Location = require('../models/locationModel');
const errorResponse = require('../libs/errorHandler');

// create document for a location in db
// use schema defined in models/locationModel.js
const locationAdd = async (req, res) => {
    // check mac/equipId in system
    // get assignedEmployeeId
    // calculate position
    // calculate safe area
    // update equipmentModel
    const location = new Location({
        equipId: req.body.equipId,
        name: req.body.name,
        mac: req.body.mac,
        timeRecorded: req.body.timeRecorded,
        wifiScan: req.body.wifiScan,
        weightSensor: req.body.weightSensor,
        assignedEmployeeId: assignedEmployeeId,
        isWorn: isWorn,
        inSafeArea: inSafeArea,
        x: x,
        y: y,
    });

    // using mongoose
    try {
        const newLocation = await location.save();
        // // get io object that was attached to app in index.js, app is attached to req
        // const io = req.app.get('io');
        // io.emit('tagLocationUpdate', 'messageeeeeee')
        res.set('Location', `${req.protocol}://${req.hostname}${req.baseUrl}/get/${newLocation.id}`)
        res.status(201).json({
            message: `Added location with id = ${newLocation.id}`,
        });
    } catch (err) {
        errorResponse(err, res);
    }
};

// get location document by employeeId
const locationGetByEmployeeId = async (req, res) => {
    try {
        // aggregate?
        const locations = await Location.find({ assignedEmployeeId: req.params.employeeId });
        if (!Array.isArray(locations) || locations.length < 1) {
            res.status(404).json({
                message: `Could not find location with assignedEmployeeId = ${req.params.employeeId}`,
            });
            return;
        }
        res.status(200).json(locations);
    } catch (err) {
        errorResponse(err, res);
    }
};

// get location document by equipId
const locationGetByEquipId = async (req, res) => {
    try {
        // aggregate?
        const locations = await Location.find({ equipId: req.params.equipId });
        if (!Array.isArray(locations) || locations.length < 1) {
            res.status(404).json({
                message: `Could not find location with equipId = ${req.params.equipId}`,
            });
            return;
        }
        res.status(200).json(locations);
    } catch (err) {
        errorResponse(err, res);
    }
};

module.exports = {
    locationAdd,
    locationGetByEmployeeId,
    locationGetByEquipId,
};
