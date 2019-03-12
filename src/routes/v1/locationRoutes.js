const router = require('express').Router();
const locationControllers = require('../../controllers/locationControllers');

// /api/v1/location/ endpoint
router.all('/', (req, res) => {
    res.status(200).json({
        message: 'CRUD operations for location data found here',
    });
});

// POST /api/v1/location/add/ endpoint
// use handler defined in controllers/locationControllers.js
router.post('/add', locationControllers.locationAdd);

// GET /api/v1/location/get/all
// router.get('/get/all', locationControllers.locationGetAll);

// GET /api/v1/location/getByEmployeeId/:employeeId/ endpoint
router.get('/getByEmployeeId/:employeeId', locationControllers.locationGetByEmployeeId);

// GET /api/v1/location/getByEquipId/:equipId/ endpoint
router.get('/getByEquipId/:equipId', locationControllers.locationGetByEquipId);

// // PUT /api/v1/location/update/:equipId endpoint
// router.put('/update/:equipId', locationControllers.locationUpdateByEquipId);
//
// // PUT /api/v1/location/pair/:equipId endpoint
// router.put('/pair/:equipId', locationControllers.locationPairByEquipId);
//
// // DELETE /api/v1/location/delete/:equipId endpoint
// router.delete('/delete/:equipId', locationControllers.locationDeleteByEquipId);

// byMacAddress??

module.exports = router;
