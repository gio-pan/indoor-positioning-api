const Router = require('../models/routerModel');
const errorResponse = require('../libs/errorHandler');

// create document for a router in db
// use schema defined in models/routerModel.js
const routerAdd = async (req, res) => {
    // using mongoose
    try {
        const router = new Router({
            ssid: req.body.ssid,
            bssid: req.body.bssid,
            x: req.body.x,
            y: req.body.y,
        });
        const newRouter = await router.save();
        res.set('Location', `${req.protocol}://${req.hostname}${req.baseUrl}/get/${newRouter.id}`);
        res.status(201).json({
            message: `Added router with id = ${newRouter.id}`,
        });
    } catch (err) {
        errorResponse(err, res);
    }
};

// create documents for multiple routers in db
const routerAddBulk = async (req, res) => {
    // using mongoose
    try {
        const newRouters = await Router.insertMany(req.body.routers);
        res.set('Location', `${req.protocol}://${req.hostname}${req.baseUrl}/get/all`);
        res.status(201).json({
            message: `Added ${newRouters.length} routers`,
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

// // update multiple router documents by id
// // CANNOT RUN VALIDATORS
// const routerUpdateBulk = async (req, res) => {
//     try {
//         const operations = req.body.routers.map((router) => {
//             const operation = {
//                 updateOne: {
//                     filter: { _id: router._id },
//                     update: { $set: router, $inc: { __v: 1 } },
//                 },
//             };
//             return operation;
//         });
//         const result = await Router.bulkWrite(
//             operations,
//             { ordered: false },
//         );
//         res.status(200).json({
//             message: `Updated ${result.modifiedCount} routers`,
//             operations: operations,
//         });
//     } catch (err) {
//         errorResponse(err, res);
//     }
// };

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

// delete all router documents
const routerDeleteAll = async (req, res) => {
    try {
        const result = await Router.deleteMany({});
        res.status(200).json({
            message: `Deleted ${result.deletedCount} routers`,
        });
    } catch (err) {
        errorResponse(err, res);
    }
};

// delete multiple router documents by id
const routerDeleteBulk = async (req, res) => {
    try {
        const result = await Router.deleteMany({ _id: { $in: req.body.ids } });
        res.status(200).json({
            message: `Deleted ${result.deletedCount} routers`,
        });
    } catch (err) {
        errorResponse(err, res);
    }
};

// delete router document by id
const routerDeleteById = async (req, res) => {
    try {
        const router = await Router.findByIdAndDelete(req.params.id);
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
    routerAddBulk,
    routerGetAll,
    routerGetById,
    routerUpdateById,
    routerDeleteAll,
    routerDeleteBulk,
    routerDeleteById,
};
