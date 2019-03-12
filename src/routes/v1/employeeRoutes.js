const router = require('express').Router();
const employeeControllers = require('../../controllers/employeeControllers');

// /api/v1/employee/ endpoint
router.all('/', (req, res) => {
    res.status(200).json({
        message: 'CRUD operations for employee data found here',
    });
});

// POST /api/v1/employee/add/ endpoint
// use handler defined in controllers/employeeControllers.js
router.post('/add', employeeControllers.employeeAdd);

// GET /api/v1/employee/get/all
router.get('/get/all', employeeControllers.employeeGetAll);

// GET /api/v1/employee/get/:employeeId/ endpoint
router.get('/get/:employeeId', employeeControllers.employeeGetByEmployeeId);

// PUT /api/v1/employee/update/:employeeId endpoint
router.put('/update/:employeeId', employeeControllers.employeeUpdateByEmployeeId);

// DELETE /api/v1/employee/delete/:employeeId endpoint
router.delete('/delete/:employeeId', employeeControllers.employeeDeleteByEmployeeId);

// assign equipment

module.exports = router;
