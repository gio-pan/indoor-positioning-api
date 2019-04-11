const Floorplan = require('../models/floorplanModel');
const Geofence = require('../models/geofenceModel');
const errorResponse = require('../libs/errorHandler');
const updateEquipments = require('../libs/updateEquipments');

const multerError = (req, res) => {
    if (req.fileTypeError) {
        res.status(415).json({
            message: 'Unsupported Media Type',
            error: 'floorplan must be a png or jpeg file',
        });
        return true;
    }

    if (typeof req.file === 'undefined') {
        res.status(400).json({
            message: 'Bad Request',
            error: 'floorplan is a required field in the form-data',
        });
        return true;
    }

    return false;
};

// create document for a floorplan in db
// use schema defined in models/floorplanModel.js
const floorplanAdd = async (req, res) => {
    if (multerError(req, res)) {
        return;
    }

    // using mongoose
    try {
        const floorplan = new Floorplan({
            data: req.file.buffer,
            contentType: req.file.mimetype,
            size: req.file.size,
            xScale: req.body.xScale,
            yScale: req.body.yScale,
        });

        const oldFloorplan = await Floorplan.findOne({});
        if (oldFloorplan !== null) {
            res.status(409).json({
                message: 'A floorplan already exists. Only 1 floorplan can be added at a time',
            });
            return;
        }
        await floorplan.save();
        res.set('Location', `${req.protocol}://${req.hostname}${req.baseUrl}/get`);
        res.status(201).json({
            message: 'Added floorplan',
        });
    } catch (err) {
        errorResponse(err, res);
    }
};

// get floorplan document
const floorplanGet = async (req, res) => {
    try {
        const floorplan = await Floorplan.findOne({});
        if (floorplan === null) {
            res.status(404).json({
                message: 'No floorplan in database',
            });
            return;
        }

        // convert binary buffer into base64 string so client can understand
        const base64Flag = `data:${floorplan.contentType};base64,`;
        const base64Image = floorplan.data.toString('base64');

        const convertedResponse = {
            contentType: floorplan.contentType,
            size: floorplan.size,
            createdAt: floorplan.createdAt,
            updatedAt: floorplan.updatedAt,
            imgData: base64Flag + base64Image,
            xScale: floorplan.xScale,
            yScale: floorplan.yScale,
        };

        res.status(200).json(convertedResponse);
    } catch (err) {
        errorResponse(err, res);
    }
};

// update floorplan document
const floorplanUpdate = async (req, res) => {
    if (multerError(req, res)) {
        return;
    }
    try {
        const newFloorplan = {
            data: req.file.buffer,
            contentType: req.file.mimetype,
            size: req.file.size,
            xScale: req.body.xScale,
            yScale: req.body.yScale,
        };

        const floorplan = await Floorplan.findOneAndUpdate(
            {},
            { $set: newFloorplan, $inc: { __v: 1 } },
            { new: true, runValidators: false }, // new: return updated document instead of original
        );
        if (floorplan === null) {
            res.status(404).json({
                message: 'No floorplan in database',
            });
            return;
        }

        // delete geofence
        await Geofence.findOneAndDelete({});
        // get io object that was attached to app in index.js, app is attached to req
        const io = req.app.get('io');
        // update each equipmentModel
        // push update to dashboard
        await updateEquipments.updateAllStatus([], io);

        res.status(200).json({
            message: 'Updated floorplan',
            updatedObject: floorplan,
        });
    } catch (err) {
        errorResponse(err, res);
    }
};

// delete floorplan document
const floorplanDelete = async (req, res) => {
    try {
        const floorplan = await Floorplan.findOneAndDelete({});
        if (floorplan === null) {
            res.status(404).json({
                message: 'No floorplan in database',
            });
            return;
        }

        // delete geofence
        await Geofence.findOneAndDelete({});
        // get io object that was attached to app in index.js, app is attached to req
        const io = req.app.get('io');
        // update each equipmentModel
        // push update to dashboard
        await updateEquipments.updateAllStatus([], io);

        res.status(200).json({
            message: 'Deleted floorplan',
        });
    } catch (err) {
        errorResponse(err, res);
    }
};

module.exports = {
    floorplanAdd,
    floorplanGet,
    floorplanUpdate,
    floorplanDelete,
};
