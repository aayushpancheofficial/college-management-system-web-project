import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, `Please provide name`],
            trim: true,
            maxlength: [50, `Name cannot be longer than 50 characters`]
        },
        email: {
            type: String,
            required: [true, `please provide email address`],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Please provide a valid email address'
            ]
        },
        password: {
            type: String,
            required: [true, `please provide a password`],
            minlength: [6, `password must be at least 6 characters long`],
            select: false
        },
        role: {
            type: String,
            enum: {
                values: ['admin', 'faculty', 'student'],
                message: `{VALUE} is not a valid role`
            },
            default: `student`
        },
        avatar: {
            type: String,
            default: ''
        },
        phone: {
            type: String,
            default: ''
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'other']
        },
        dob: {
            type: Date
        },
        department: {
            type: String,
            trim: true
        },
        enrollmentNo: {
            type: String,
            unique: true,
            sparse: true,
            trim: true
        },
        employeeId: {
            type: String,
            unique: true,
            trim: true,
            sparse: true,
            trim: true
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

export default User;