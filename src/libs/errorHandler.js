const errorResponse = (err, res) => {
    if (err.name === 'ValidationError') {
        res.status(400).json({
            message: 'Validation Error',
            error: err,
        });
        return;
    }

    if (err.name === 'MongoError' && err.code === 11000) {
        res.status(409).json({
            message: 'Duplicate Key',
            error: err,
        });
        return;
    }

    res.status(500).json({
        message: 'Could not perform operation due to an internal server error',
        error: {
            name: err.name,
            message: err.message,
        },
    });
};

module.exports = errorResponse;
