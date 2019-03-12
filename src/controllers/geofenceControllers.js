const Geofence = require('../models/geofenceModel');
const errorResponse = require('../libs/errorHandler');

// create document for a geofence in db
// use schema defined in models/geofenceModel.js
const geofenceAdd = async (req, res) => {
    if (!Array.isArray(req.body.vertices) || req.body.vertices.length < 3) {
        res.status(400).json({
            message: 'Invalid vertices in req.body. Vertices must be array of x,y coordinates of length 3 or more.'
        })
        return;
    }
    const geofence = new Geofence({
        vertices: req.body.vertices,
        safetyLevel: req.body.safetyLevel,
    });

    // using mongoose
    try {
        const newGeofence = await geofence.save();
        // update each equipmentModel
        // push update to dashboard?
        res.set('Location', `${req.protocol}://${req.hostname}${req.baseUrl}/get/${newGeofence.id}`)
        res.status(201).json({
            message: `Added geofence with id = ${newGeofence.id}`,
        });
    } catch (err) {
        errorResponse(err, res);
    }
};

// get all geofence documents
const geofenceGetAll = async (req, res) => {
    try {
        const geofences = await Geofence.find({}); // sort?
        res.status(200).json(geofences);
    } catch (err) {
        errorResponse(err, res);
    }
};

// get geofence document by id
const geofenceGetById = async (req, res) => {
    try {
        const geofence = await Geofence.findById(req.params.id);
        if (geofence === null) {
            res.status(404).json({
                message: `Could not find geofence with id = ${req.params.id}`,
            });
            return;
        }
        res.status(200).json(geofence);
    } catch (err) {
        errorResponse(err, res);
    }
};

// update geofence document by id
const geofenceUpdateById = async (req, res) => {
    if (!Array.isArray(req.body.vertices) || req.body.vertices.length < 3) {
        res.status(400).json({
            message: 'Invalid vertices in req.body. Vertices must be array of x,y coordinates of length 3 or more.'
        })
        return;
    }
    try {
        const geofence = await Geofence.findByIdAndUpdate(
            req.params.id,
            { $set: req.body, $inc: { __v: 1 } },
            { new: true, runValidators: true }, // new: return updated document instead of original
        );
        // update each equipmentModel
        // push update to dashboard?
        if (geofence === null) {
            res.status(404).json({
                message: `Could not find geofence with id = ${req.params.id}`,
            });
            return;
        }
        res.status(200).json({
            message: `Updated geofence with id = ${req.params.id}`,
            updatedObject: geofence,
        });
    } catch (err) {
        errorResponse(err, res);
    }
};

// delete geofence document by id
const geofenceDeleteById = async (req, res) => {
    try {
        const geofence = await Geofence.findByIdAndDelete(req.params.id);
        // update each equipmentModel
        // push update to dashboard?
        if (geofence === null) {
            res.status(404).json({
                message: `Could not find geofence with id = ${req.params.id}`,
            });
            return;
        }
        res.status(200).json({
            message: `Deleted geofence with id = ${req.params.id}`,
            deletedObject: geofence,
        });
    } catch (err) {
        errorResponse(err, res);
    }
};

module.exports = {
    geofenceAdd,
    geofenceGetAll,
    geofenceGetById,
    geofenceUpdateById,
    geofenceDeleteById,
};
