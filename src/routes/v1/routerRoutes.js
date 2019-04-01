const router = require('express').Router();
const routerControllers = require('../../controllers/routerControllers');

// /api/v1/router/ endpoint
router.all('/', (req, res) => {
    res.status(200).json({
        message: 'CRUD operations for router data found here',
    });
});

// POST /api/v1/router/add/ endpoint
// use handler defined in controllers/routerControllers.js
router.post('/add', routerControllers.routerAdd);

// POST /api/v1/router/add/bulk endpoint
router.post('/add/bulk', routerControllers.routerAddBulk);

// GET /api/v1/router/get/all
router.get('/get/all', routerControllers.routerGetAll);

// GET /api/v1/router/get/:id endpoint
router.get('/get/:id', routerControllers.routerGetById);

// PUT /api/v1/router/update/bulk endpoint
// router.put('/update/bulk', routerControllers.routerUpdateBulk);

// PUT /api/v1/router/update/:id endpoint
router.put('/update/:id', routerControllers.routerUpdateById);

// DELETE /api/v1/router/delete/all endpoint
router.delete('/delete/all', routerControllers.routerDeleteAll);

// DELETE /api/v1/router/delete/bulk endpoint
router.delete('/delete/bulk', routerControllers.routerDeleteBulk);

// DELETE /api/v1/router/delete/:id endpoint
router.delete('/delete/:id', routerControllers.routerDeleteById);

// byMacAddress??

module.exports = router;
