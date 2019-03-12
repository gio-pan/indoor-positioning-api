const router = require('express').Router();
const geofenceControllers = require('../../controllers/geofenceControllers');

// /api/v1/geofence/ endpoint
router.all('/', (req, res) => {
    res.status(200).json({
        message: 'CRUD operations for geofence data found here',
    });
});

// POST /api/v1/geofence/add/ endpoint
// use handler defined in controllers/geofenceControllers.js
router.post('/add', geofenceControllers.geofenceAdd);

// GET /api/v1/geofence/get/all
router.get('/get/all', geofenceControllers.geofenceGetAll);

// GET /api/v1/geofence/get/:id
router.get('/get/:id', geofenceControllers.geofenceGetById);

// PUT /api/v1/geofence/update/:id endpoint
router.put('/update/:id', geofenceControllers.geofenceUpdateById);

// DELETE /api/v1/geofence/delete/:id endpoint
router.delete('/delete/:id', geofenceControllers.geofenceDeleteById);


module.exports = router;
