const errorMiddleware = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    switch (err.name) {
        case 'SequelizeUniqueConstraintError':
            statusCode = 400;
            message = err.errors[0].message;
            break;
        case 'SequelizeValidationError':
            statusCode = 400;
            message = err.errors.map(e => e.message).join(', ');
            break;
    }

    res.status(statusCode).json({
        success: false,
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = { errorMiddleware };
