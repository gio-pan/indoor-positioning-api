const Location = require('../models/locationModel');
const errorResponse = require('../libs/errorHandler');

// create document for a location in db
// use schema defined in models/locationModel.js
const locationAdd = async (req, res) => {
    // check mac/equipId in system
    // get assignedEmployeeId
    // update equipmentModel
    // calculate position
    // calculate safe area
    const location = new Location({
        equipId: req.body.equipId,
        name: req.body.name,
        mac: req.body.mac,
        timeRecorded: req.body.timeRecorded,
        wifiScan: req.body.wifiScan,
        assignedEmployeeId: assignedEmployeeId,
        isWorn: req.body.isWorn,
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
        res.set('Location', `${req.protocol}://${req.hostname}${req.baseUrl}/get/${location.equipId}`)
        res.status(201).json({
            message: `Added location with equipId = ${location.equipId}`,
        });
    } catch (err) {
        errorResponse(err, res);
    }
};

// get location document by employeeId
const locationGetByEmployeeId = async (req, res) => {
    try {
        // aggregate?
        const location = await Location.findOne({ employeeId: req.params.employeeId });
        if (location === null) {
            res.status(404).json({
                message: `Could not find location with employeeId = ${req.params.employeeId}`,
            });
            return;
        }
        res.status(200).json(location);
    } catch (err) {
        errorResponse(err, res);
    }
};

// get location document by equipId
const locationGetByEquipId = async (req, res) => {
    try {
        // aggregate?
        const location = await Location.findOne({ equipId: req.params.equipId });
        if (location === null) {
            res.status(404).json({
                message: `Could not find location with equipId = ${req.params.equipId}`,
            });
            return;
        }
        res.status(200).json(location);
    } catch (err) {
        errorResponse(err, res);
    }
};

module.exports = {
    locationAdd,
    locationGetByEmployeeId,
    locationGetByEquipId,
};
