const router = require('express').Router();

// /api/v1/ endpoint
router.all('/', (req, res) => {
    res.status(200).json({
        message: 'This is the root endpoint for the v1 API',
    });
});

// /api/v1/position/... endpoints defined in routes/v1/position.js
router.use('/position', require('./v1/positionRoutes'));

module.exports = router;
