import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';

export const protect = async (req, res, next) => {
    try {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            throw new ApiError(401, 'Not authorized, please login to get access');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            throw new ApiError(401, 'User belonging to this token no longer exists');
        }

        if (!user.isActive) {
            throw new ApiError(403, 'Your account has been deactivated. Please contact Admin.');
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            next(new ApiError(401, 'Invalid token, please login again'));
        } else if (error.name === 'TokenExpiredError') {
            next(new ApiError(401, 'Token expired, please login again'));
        } else {
            next(error);
        }
    }
};

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            throw new ApiError(403, `Role (${req.user?.role || 'Guest'}) is not allowed to access this resource`);
        }
        next();
    };
};
