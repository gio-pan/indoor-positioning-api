const Floorplan = require('../models/floorplanModel');
const errorResponse = require('../libs/errorHandler');

// create document for a floorplan in db
// use schema defined in models/floorplanModel.js
const floorplanAdd = async (req, res) => {
    console.log(req.file);
    // const floorplan = new Floorplan({
    //     data: req.body.data,
    //     contentType: req.body.contentType,
    // });

    // using mongoose
    // try {
    //     const oldFloorplan = await Floorplan.find({});
    //     if (oldFloorplan !== null) {
    //         res.status(409).json({
    //             message: 'A floorplan already exists. Only 1 floorplan can be added at a time',
    //         })
    //         return;
    //     }
    //     const newFloorplan = await floorplan.save();
    //     res.set('Location', `${req.protocol}://${req.hostname}${req.baseUrl}/get`)
    //     res.status(201).json({
    //         message: `Added floorplan with id = ${newFloorplan.id}`,
    //     });
    // } catch (err) {
    //     errorResponse(err, res);
    // }
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
        res.status(200).json(floorplan);
    } catch (err) {
        errorResponse(err, res);
    }
};

// update floorplan document
const floorplanUpdate = async (req, res) => {
    // delete geofences?
    try {
        const floorplan = await Floorplan.findOneAndUpdate(
            {},
            { $set: req.body, $inc: { __v: 1 } },
            { new: true, runValidators: true }, // new: return updated document instead of original
        );
        if (floorplan === null) {
            res.status(404).json({
                message: `No floorplan in database`,
            });
            return;
        }
        res.status(200).json({
            message: `Updated floorplan`,
            updatedObject: floorplan,
        });
    } catch (err) {
        errorResponse(err, res);
    }
};

// delete floorplan document
const floorplanDelete = async (req, res) => {
    // delete geofences
    try {
        const floorplan = await Floorplan.deleteOne({});
        res.status(200).json({
            message: `Deleted floorplan`,
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
