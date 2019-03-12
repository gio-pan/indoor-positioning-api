const router = require('express').Router();
const equipmentControllers = require('../../controllers/equipmentControllers');

// /api/v1/equipment/ endpoint
router.all('/', (req, res) => {
    res.status(200).json({
        message: 'CRUD operations for equipment data found here',
    });
});

// POST /api/v1/equipment/add/ endpoint
// use handler defined in controllers/equipmentControllers.js
router.post('/add', equipmentControllers.equipmentAdd);

// GET /api/v1/equipment/get/all
router.get('/get/all', equipmentControllers.equipmentGetAll);

// GET /api/v1/equipment/get/:equipId/ endpoint
router.get('/get/:equipId', equipmentControllers.equipmentGetByEquipId);

// PUT /api/v1/equipment/update/:equipId endpoint
router.put('/update/:equipId', equipmentControllers.equipmentUpdateByEquipId);

// PUT /api/v1/equipment/pair/:equipId endpoint
router.put('/pair/:equipId', equipmentControllers.equipmentPairByEquipId);

// PUT /api/v1/equipment/pair/:equipId endpoint
// router.put('/unpair/:equipId', equipmentControllers.equipmentPairByEquipId);

// DELETE /api/v1/equipment/delete/:equipId endpoint
router.delete('/delete/:equipId', equipmentControllers.equipmentDeleteByEquipId);

// byMacAddress??
// aggregate by employee?

module.exports = router;
