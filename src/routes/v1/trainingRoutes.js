const router = require('express').Router();
const trainingControllers = require('../../controllers/trainingControllers');

// /api/v1/training/ endpoint
router.all('/', (req, res) => {
    res.status(200).json({
        message: 'CRUD operations for training data found here',
    });
});

// POST /api/v1/training/add/ endpoint
// use handler defined in controllers/trainingControllers.js
router.post('/add', trainingControllers.trainingAdd);

// POST /api/v1/training/add/bulk endpoint
router.post('/add/bulk', trainingControllers.trainingAddBulk);

// POST /api/v1/training/add/wifiScan endpoint
router.post('/add/wifiScan', trainingControllers.trainingAddWifiScan);

// POST /api/v1/training/add/label endpoint
router.post('/add/label', trainingControllers.trainingAddLabel);

// GET /api/v1/training/get/all
router.get('/get/all', trainingControllers.trainingGetAll);

// GET /api/v1/training/get/:id endpoint
router.get('/get/:id', trainingControllers.trainingGetById);

// PUT /api/v1/training/update/:id endpoint
router.put('/update/:id', trainingControllers.trainingUpdateById);

// DELETE /api/v1/training/delete/all endpoint
router.delete('/delete/all', trainingControllers.trainingDeleteAll);

// DELETE /api/v1/training/delete/bulk endpoint
router.delete('/delete/bulk', trainingControllers.trainingDeleteBulk);

// DELETE /api/v1/training/delete/:id endpoint
router.delete('/delete/:id', trainingControllers.trainingDeleteById);

// byMacAddress??

module.exports = router;
