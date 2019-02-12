const router = require('express').Router()

router.use('/test', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: "hello"
    })
});

router.use('*', (req, res) => {
  console.log('404 Not Found');
  res.status(404).json({
    status: 'Error',
    message: 'Not found',
  });
});

module.exports = router
