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
router.use('/location', require('./v1/locationRoutes'));

// /api/v1/geofence/... endpoints defined in routes/v1/geofence.js
router.use('/geofence', require('./v1/geofenceRoutes'));

// /api/v1/floorplan/... endpoints defined in routes/v1/floorplan.js
router.use('/floorplan', require('./v1/floorplanRoutes'));

// /api/v1/router/... endpoints defined in routes/v1/router.js
router.use('/router', require('./v1/routerRoutes'));

// /api/v1/sensor/... endpoints defined in routes/v1/sensor.js
router.use('/sensor', require('./v1/sensorRoutes'));

module.exports = router;
