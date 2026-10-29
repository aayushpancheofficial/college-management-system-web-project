import ApiError from '../utils/ApiError.js';

export const notFound = (req, res, next) => {
    const error = new ApiError(404, `Route Not Found - ${req.originalUrl}`);
    next(error);
};

export const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
    error.statusCode = err.statusCode;

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = `Resource not found with id of ${err.value}`;
        error = new ApiError(404, message);
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue || {})[0] || 'field';
        const message = `Duplicate value entered for ${field}. Please use another value.`;
        error = new ApiError(400, message);
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors || {}).map((val) => val.message);
        error = new ApiError(400, messages.join(', '));
    }

    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message: error.message || 'Internal Server Error',
        errors: error.errors || [],
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};
