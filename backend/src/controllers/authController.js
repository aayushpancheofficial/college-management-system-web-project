import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import generateToken from '../utils/generateToken.js';

export const register = async (req, res, next) => {
    try {
        const { name, email, password, role, department, enrollmentNo, employeeId, phone, gender, dob } = req.body;

        if (!name || !email || !password) {
            throw new ApiError(400, 'Please provide name, email, and password');
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new ApiError(400, 'User with this email already exists');
        }

        const user = await User.create({
            name,
            email,
            password,
            role: role || 'student',
            department,
            enrollmentNo,
            employeeId,
            phone,
            gender,
            dob
        });

        const token = generateToken(user._id, user.role);

        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            department: user.department,
            enrollmentNo: user.enrollmentNo,
            employeeId: user.employeeId,
            phone: user.phone
        };

        return res
            .status(201)
            .json(new ApiResponse(201, { user: userData, token }, 'User registered successfully'));
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new ApiError(400, 'Please provide email and password');
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            throw new ApiError(401, 'Invalid email or password');
        }

        const isPasswordMatch = await user.matchPassword(password);
        if (!isPasswordMatch) {
            throw new ApiError(401, 'Invalid email or password');
        }

        if (!user.isActive) {
            throw new ApiError(403, 'Your account has been deactivated. Please contact Admin.');
        }

        const token = generateToken(user._id, user.role);

        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            department: user.department,
            enrollmentNo: user.enrollmentNo,
            employeeId: user.employeeId,
            phone: user.phone
        };

        return res
            .status(200)
            .json(new ApiResponse(200, { user: userData, token }, 'Login successful'));
    } catch (error) {
        next(error);
    }
};


export const getMe = async (req, res, next) => {
    try {
        const user = await
            User.findById(req.user._id);

        return res
            .status(200)
            .json(new ApiResponse(200, { user }, 'Profile fetched sucessfully'));
    } catch (error) {
        next(error);
    }
};
