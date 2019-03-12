const router = require('express').Router();

// /api/v1/ endpoint
router.all('/', (req, res) => {
    res.status(200).json({
        message: 'This is the root endpoint for the v1 API',
    });
});

// /api/v1/employee/... endpoints defined in routes/v1/employee.js
router.use('/employee', require('./v1/employeeRoutes'));

// /api/v1/equipment/... endpoints defined in routes/v1/equipment.js
router.use('/equipment', require('./v1/equipmentRoutes'));

// /api/v1/location/... endpoints defined in routes/v1/location.js
// router.use('/location', require('./v1/locationRoutes'));

// /api/v1/geofence/... endpoints defined in routes/v1/geofence.js
router.use('/geofence', require('./v1/geofenceRoutes'));

module.exports = router;
