const router = require('express').Router();
const sensorControllers = require('../../controllers/sensorControllers');

// /api/v1/sensor/ endpoint
router.all('/', (req, res) => {
    res.status(200).json({
        message: 'CRUD operations for sensor data found here',
    });
});

// POST /api/v1/sensor/add/ endpoint
// use handler defined in controllers/sensorControllers.js
router.post('/add', sensorControllers.sensorAdd);

// GET /api/v1/sensor/get/:sensorId/ endpoint
router.get('/get', sensorControllers.sensorGet);

// PUT /api/v1/sensor/update/:sensorId endpoint
router.put('/update', sensorControllers.sensorUpdate);

// DELETE /api/v1/sensor/delete/:sensorId endpoint
router.delete('/delete', sensorControllers.sensorDelete);

module.exports = router;
