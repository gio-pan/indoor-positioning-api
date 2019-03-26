const Router = require('../models/routerModel');
const errorResponse = require('../libs/errorHandler');

// create document for a router in db
// use schema defined in models/routerModel.js
const routerAdd = async (req, res) => {
    const router = new Router({
        ssid: req.body.ssid,
        bssid: req.body.bssid,
        x: req.body.x,
        y: req.body.y,
    });

    // using mongoose
    try {
        const newRouter = await router.save();
        res.set('Location', `${req.protocol}://${req.hostname}${req.baseUrl}/get/${newRouter.id}`)
        res.status(201).json({
            message: `Added router with id = ${newRouter.id}`,
        });
    } catch (err) {
        errorResponse(err, res);
    }
};

// get all router documents
const routerGetAll = async (req, res) => {
    try {
        const routers = await Router.find({}); // sort?
        res.status(200).json(routers);
    } catch (err) {
        errorResponse(err, res);
    }
};

// get router document by id
const routerGetById = async (req, res) => {
    try {
        const router = await Router.findById(req.params.id);
        if (router === null) {
            res.status(404).json({
                message: `Could not find router with id = ${req.params.id}`,
            });
            return;
        }
        res.status(200).json(router);
    } catch (err) {
        errorResponse(err, res);
    }
};

// update router document by id
const routerUpdateById = async (req, res) => {
    try {
        const router = await Router.findByIdAndUpdate(
            req.params.id,
            { $set: req.body, $inc: { __v: 1 } },
            { new: true, runValidators: true }, // new: return updated document instead of original
        );
        if (router === null) {
            res.status(404).json({
                message: `Could not find router with id = ${req.params.id}`,
            });
            return;
        }
        res.status(200).json({
            message: `Updated router with id = ${req.params.id}`,
            updatedObject: router,
        });
    } catch (err) {
        errorResponse(err, res);
    }
};

// delete router document by id
const routerDeleteById = async (req, res) => {
    try {
        const router = await Router.findByIdAndDelete(req.params.id);
        // delete location history?
        // unpair equipment
        if (router === null) {
            res.status(404).json({
                message: `Could not find router with id = ${req.params.id}`,
            });
            return;
        }
        res.status(200).json({
            message: `Deleted router with id = ${req.params.id}`,
            deletedObject: router,
        });
    } catch (err) {
        errorResponse(err, res);
    }
};

module.exports = {
    routerAdd,
    routerGetAll,
    routerGetById,
    routerUpdateById,
    routerDeleteById,
};
