import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide name'],
            trim: true,
            maxlength: [50, 'Name cannot be longer than 50 characters']
        },
        email: {
            type: String,
            required: [true, 'Please provide email address'],
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
            required: [true, 'Please provide a password'],
            minlength: [6, 'Password must be at least 6 characters long'],
            select: false
        },
        role: {
            type: String,
            enum: {
                values: ['admin', 'faculty', 'student'],
                message: '{VALUE} is not a valid role'
            },
            default: 'student'
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

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcryptjs.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
