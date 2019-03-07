const router = require('express').Router();
const positionControllers = require('../../controllers/positionControllers.js');

// /api/v1/position/ endpoint
router.all('/', (req, res) => {
    res.status(200).json({
        message: 'CRUD operations for position data found here',
    });
});

// POST /api/v1/position/create/ endpoint
// use handler defined in controllers/positionControllers.js
router.post('/create', positionControllers.positionCreate);

// GET /api/v1/position/all
router.get('/all', positionControllers.positionReadAll);

// GET /api/v1/position/:id/ endpoint
router.get('/:id', positionControllers.positionReadById);

// PUT /api/v1/position/update/:id endpoint
router.put('/update/:id', positionControllers.positionUpdateById);

// DELETE /api/v1/position/delete/:id endpoint
router.delete('/delete/:id', positionControllers.positionDeleteById);

module.exports = router;
