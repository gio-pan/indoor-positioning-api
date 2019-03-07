const Position = require('../models/positionModel.js');

// create document for a position in db
// use schema defined in models/positionModel.js
const positionCreate = (req, res) => {
    const position = new Position({
        x: req.body.x,
        y: req.body.y,
    });

    // using mongoose
    position.save((err) => {
        if (err) {
            res.status(500).json({
                message: 'Could not add data to database',
                details: err.toString(),
            });
        }

        res.status(201).json({
            message: 'Position created!',
        });
    });
};

// get all position documents
const positionReadAll = (req, res) => {
    Position.find({}, (err, doc) => {
        if (err) {
            res.status(500).json({
                message: 'Could not get data from database',
                details: err.toString(),
            });
        }

        res.status(200).json(doc);
    });
};

// get position document by id
const positionReadById = (req, res) => {
    Position.findById(req.params.id, (err, doc) => {
        if (err) {
            res.status(500).json({
                message: 'Could not get data from database',
                details: err.toString(),
            });
        }

        res.status(200).json(doc);
    });
};

// update position document by id
const positionUpdateById = (req, res) => {
    Position.findByIdAndUpdate(req.params.id, { $set: req.body }, (err) => {
        if (err) {
            res.status(500).json({
                message: 'Could not update data in database',
                details: err.toString(),
            });
        }

        res.status(200).json({
            message: 'Position updated!',
        });
    });
};

// delete position document by id
const positionDeleteById = (req, res) => {
    Position.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.status(500).json({
                message: 'Could not delete data from database',
                details: err.toString(),
            });
        }

        res.status(200).json({
            message: 'Position deleted!',
        });
    });
};

module.exports = {
    positionCreate,
    positionReadAll,
    positionReadById,
    positionUpdateById,
    positionDeleteById,
};
