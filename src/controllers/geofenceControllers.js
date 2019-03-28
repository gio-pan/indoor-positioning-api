const Geofence = require('../models/geofenceModel');
const errorResponse = require('../libs/errorHandler');

// create document for a geofence in db
// use schema defined in models/geofenceModel.js
const geofenceAdd = async (req, res) => {
    // using mongoose
    try {
        const geofence = new Geofence({
            boundaries: req.body.boundaries,
        });
        const oldGeofence = await Geofence.findOne({});
        if (oldGeofence !== null) {
            res.status(409).json({
                message: 'A geofence already exists. Only 1 geofence can be added at a time',
            });
            return;
        }
        const newGeofence = await geofence.save();
        // update each equipmentModel
        // push update to dashboard?
        res.set('Location', `${req.protocol}://${req.hostname}${req.baseUrl}/get`);
        res.status(201).json({
            message: `Added geofence with id = ${newGeofence.id}`,
        });
    } catch (err) {
        errorResponse(err, res);
    }
};

// get geofence document
const geofenceGet = async (req, res) => {
    try {
        const geofence = await Geofence.findOne({});
        if (geofence === null) {
            res.status(404).json({
                message: 'No geofence in database',
            });
            return;
        }
        res.status(200).json(geofence);
    } catch (err) {
        errorResponse(err, res);
    }
};

// update geofence document
const geofenceUpdate = async (req, res) => {
    try {
        const geofence = await Geofence.findOneAndUpdate(
            {},
            { $set: req.body, $inc: { __v: 1 } },
            { new: true, runValidators: true }, // new: return updated document instead of original
        );
        // update each equipmentModel
        // push update to dashboard?
        if (geofence === null) {
            res.status(404).json({
                message: 'No geofence in database',
            });
            return;
        }
        res.status(200).json({
            message: `Updated geofence with id = ${geofence.id}`,
            updatedObject: geofence,
        });
    } catch (err) {
        errorResponse(err, res);
    }
};

// delete geofence document
const geofenceDelete = async (req, res) => {
    try {
        const geofence = await Geofence.findOneAndDelete({});
        if (geofence === null) {
            res.status(404).json({
                message: 'Could not find geofence',
            });
            return;
        }
        // update each equipmentModel
        // push update to dashboard?
        res.status(200).json({
            message: 'Deleted geofence',
        });
    } catch (err) {
        errorResponse(err, res);
    }
};

// create documents for multiple geofences in db
// const geofenceAddBulk = async (req, res) => {
//     // using mongoose
//     try {
//         const newGeofences = await Geofence.insertMany(req.body);
//         // update each equipmentModel
//         // push update to dashboard?
//         res.set('Location', `${req.protocol}://${req.hostname}${req.baseUrl}/get/all`);
//         res.status(201).json({
//             message: `Added ${newGeofences.length} geofences`,
//         });
//     } catch (err) {
//         errorResponse(err, res);
//     }
// };

// // get all geofence documents
// const geofenceGetAll = async (req, res) => {
//     try {
//         const geofences = await Geofence.find({}); // sort?
//         res.status(200).json(geofences);
//     } catch (err) {
//         errorResponse(err, res);
//     }
// };
//
// // get geofence document by id
// const geofenceGetById = async (req, res) => {
//     try {
//         const geofence = await Geofence.findById(req.params.id);
//         if (geofence === null) {
//             res.status(404).json({
//                 message: `Could not find geofence with id = ${req.params.id}`,
//             });
//             return;
//         }
//         res.status(200).json(geofence);
//     } catch (err) {
//         errorResponse(err, res);
//     }
// };

// update geofence document by id
// const geofenceUpdateById = async (req, res) => {
//     try {
//         const geofence = await Geofence.findByIdAndUpdate(
//             req.params.id,
//             { $set: req.body, $inc: { __v: 1 } },
//             { new: true, runValidators: true },
//         // update each equipmentModel
//         // push update to dashboard?
//         if (geofence === null) {
//             res.status(404).json({
//                 message: `Could not find geofence with id = ${req.params.id}`,
//             });
//             return;
//         }
//         res.status(200).json({
//             message: `Updated geofence with id = ${req.params.id}`,
//             updatedObject: geofence,
//         });
//     } catch (err) {
//         errorResponse(err, res);
//     }
// };
//
// // delete all geofence documents
// const geofenceDeleteAll = async (req, res) => {
//     try {
//         const result = await Geofence.deleteMany({});
//         // update each equipmentModel
//         // push update to dashboard?
//         res.status(200).json({
//             message: `Deleted ${result.deletedCount} geofences`,
//         });
//     } catch (err) {
//         errorResponse(err, res);
//     }
// };
//
// // delete geofence document by id
// const geofenceDeleteById = async (req, res) => {
//     try {
//         const geofence = await Geofence.findByIdAndDelete(req.params.id);
//         // update each equipmentModel
//         // push update to dashboard?
//         if (geofence === null) {
//             res.status(404).json({
//                 message: `Could not find geofence with id = ${req.params.id}`,
//             });
//             return;
//         }
//         res.status(200).json({
//             message: `Deleted geofence with id = ${req.params.id}`,
//             deletedObject: geofence,
//         });
//     } catch (err) {
//         errorResponse(err, res);
//     }
// };

module.exports = {
    geofenceAdd,
    geofenceGet,
    geofenceUpdate,
    geofenceDelete,
};
