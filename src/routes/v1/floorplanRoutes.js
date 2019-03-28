const router = require('express').Router();
const multer = require('multer');
const floorplanControllers = require('../../controllers/floorplanControllers');

// save to memory as a buffer before sending to mongo
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { filesize: 5 * 1000 * 1000 }, // limit file to 5MBr
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
            cb(null, true);
        } else {
            req.fileTypeError = true;
            cb(null, false);
        }
    },
});

// /api/v1/floorplan/ endpoint
router.all('/', (req, res) => {
    res.status(200).json({
        message: 'CRUD operations for floorplan data found here',
    });
});

// POST /api/v1/floorplan/add/ endpoint
// use handler defined in controllers/floorplanControllers.js
// extract single file from fieldname: 'floorplan'
router.post('/add', upload.single('floorplan'), floorplanControllers.floorplanAdd);

// GET /api/v1/floorplan/get/:floorplanId/ endpoint
router.get('/get', floorplanControllers.floorplanGet);

// PUT /api/v1/floorplan/update/:floorplanId endpoint
router.put('/update', upload.single('floorplan'), floorplanControllers.floorplanUpdate);

// DELETE /api/v1/floorplan/delete/:floorplanId endpoint
router.delete('/delete', floorplanControllers.floorplanDelete);

// multiple users?

module.exports = router;
