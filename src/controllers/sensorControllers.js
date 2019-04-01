const Sensor = require('../models/sensorModel');
const errorResponse = require('../libs/errorHandler');

// create document for a sensor in db
// use schema defined in models/sensorModel.js
const sensorAdd = async (req, res) => {
    // using mongoose
    try {
        const sensor = new Sensor({
            weightSensitivity: req.body.weightSensitivity,
            weightThreshold: req.body.weightThreshold,
            temperatureSensitivity: req.body.temperatureSensitivity,
            temperatureThreshold: req.body.temperatureThreshold,
        });
        const oldSensor = await Sensor.findOne({});
        if (oldSensor !== null) {
            res.status(409).json({
                message: 'A sensor config already exists. Only 1 sensor config can be added at a time',
            });
            return;
        }
        await sensor.save();
        // update each equipmentModel
        // push update to dashboard?
        res.set('Location', `${req.protocol}://${req.hostname}${req.baseUrl}/get`);
        res.status(201).json({
            message: 'Added sensor config',
        });
    } catch (err) {
        errorResponse(err, res);
    }
};

// get sensor document
const sensorGet = async (req, res) => {
    try {
        const sensor = await Sensor.findOne({});
        if (sensor === null) {
            res.status(404).json({
                message: 'No sensor config in database',
            });
            return;
        }
        res.status(200).json(sensor);
    } catch (err) {
        errorResponse(err, res);
    }
};

// update sensor document
const sensorUpdate = async (req, res) => {
    try {
        const sensor = await Sensor.findOneAndUpdate(
            {},
            { $set: req.body, $inc: { __v: 1 } },
            { new: true, runValidators: true }, // new: return updated document instead of original
        );
        // update each equipmentModel
        // push update to dashboard?
        if (sensor === null) {
            res.status(404).json({
                message: 'No sensor config in database',
            });
            return;
        }
        res.status(200).json({
            message: 'Updated sensor config',
            updatedObject: sensor,
        });
    } catch (err) {
        errorResponse(err, res);
    }
};

// delete sensor document
const sensorDelete = async (req, res) => {
    try {
        const sensor = await Sensor.findOneAndDelete({});
        if (sensor === null) {
            res.status(404).json({
                message: 'No sensor config in database',
            });
            return;
        }
        // update each equipmentModel
        // push update to dashboard?
        res.status(200).json({
            message: 'Deleted sensor config',
        });
    } catch (err) {
        errorResponse(err, res);
    }
};

module.exports = {
    sensorAdd,
    sensorGet,
    sensorUpdate,
    sensorDelete,
};
