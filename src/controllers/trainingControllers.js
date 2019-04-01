const Training = require('../models/trainingModel');
const errorResponse = require('../libs/errorHandler');

// create document for a training data in db
// use schema defined in models/trainingModel.js
const trainingAdd = async (req, res) => {
    // using mongoose
    try {
        const training = new Training({
            wifiScan: req.body.wifiScan,
            x: req.body.x,
            y: req.body.y,
        });
        const newTraining = await training.save();
        res.set('Location', `${req.protocol}://${req.hostname}${req.baseUrl}/get/${newTraining.id}`);
        res.status(201).json({
            message: `Added training data with id = ${newTraining.id}`,
        });
    } catch (err) {
        errorResponse(err, res);
    }
};

// create documents for multiple trainings in db
const trainingAddBulk = async (req, res) => {
    // using mongoose
    try {
        const newTrainings = await Training.insertMany(req.body.trainings);
        res.set('Location', `${req.protocol}://${req.hostname}${req.baseUrl}/get/all`);
        res.status(201).json({
            message: `Added ${newTrainings.length} training data`,
        });
    } catch (err) {
        errorResponse(err, res);
    }
};

// get all training documents
const trainingGetAll = async (req, res) => {
    try {
        const trainings = await Training.find({}); // sort?
        res.status(200).json(trainings);
    } catch (err) {
        errorResponse(err, res);
    }
};

// get training document by id
const trainingGetById = async (req, res) => {
    try {
        const training = await Training.findById(req.params.id);
        if (training === null) {
            res.status(404).json({
                message: `Could not find training data with id = ${req.params.id}`,
            });
            return;
        }
        res.status(200).json(training);
    } catch (err) {
        errorResponse(err, res);
    }
};

// update training document by id
const trainingUpdateById = async (req, res) => {
    try {
        const training = await Training.findByIdAndUpdate(
            req.params.id,
            { $set: req.body, $inc: { __v: 1 } },
            { new: true, runValidators: true }, // new: return updated document instead of original
        );
        if (training === null) {
            res.status(404).json({
                message: `Could not find training data with id = ${req.params.id}`,
            });
            return;
        }
        res.status(200).json({
            message: `Updated training with data id = ${req.params.id}`,
            updatedObject: training,
        });
    } catch (err) {
        errorResponse(err, res);
    }
};

// delete all training documents
const trainingDeleteAll = async (req, res) => {
    try {
        const result = await Training.deleteMany({});
        res.status(200).json({
            message: `Deleted ${result.deletedCount} training data`,
        });
    } catch (err) {
        errorResponse(err, res);
    }
};

// delete multiple training documents by id
const trainingDeleteBulk = async (req, res) => {
    try {
        const result = await Training.deleteMany({ _id: { $in: req.body.ids } });
        res.status(200).json({
            message: `Deleted ${result.deletedCount} training data`,
        });
    } catch (err) {
        errorResponse(err, res);
    }
};

// delete training document by id
const trainingDeleteById = async (req, res) => {
    try {
        const training = await Training.findByIdAndDelete(req.params.id);
        if (training === null) {
            res.status(404).json({
                message: `Could not find training data with id = ${req.params.id}`,
            });
            return;
        }
        res.status(200).json({
            message: `Deleted training data with id = ${req.params.id}`,
            deletedObject: training,
        });
    } catch (err) {
        errorResponse(err, res);
    }
};

module.exports = {
    trainingAdd,
    trainingAddBulk,
    trainingGetAll,
    trainingGetById,
    trainingUpdateById,
    trainingDeleteAll,
    trainingDeleteBulk,
    trainingDeleteById,
};
