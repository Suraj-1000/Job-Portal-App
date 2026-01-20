const errorMiddleware = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    // Sequelize Unique Constraint Error
    if (err.name === 'SequelizeUniqueConstraintError') {
        statusCode = 400;
        message = err.errors[0].message;
    }

    // Sequelize Validation Error
    if (err.name === 'SequelizeValidationError') {
        statusCode = 400;
        message = err.errors.map(e => e.message).join(', ');
    }

    res.status(statusCode);
    res.json({
        success: false,
        message: message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = { errorMiddleware };
