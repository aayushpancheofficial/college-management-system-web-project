import express from 'express';
import { register, login, getMe } from '../controllers/authController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import ApiResponse from '../utils/ApiResponse.js';

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/me', protect, getMe);

router.get('/admin-dashboard', protect, authorize('admin'), (req, res) => {
    res.status(200).json(
        new ApiResponse(200, { secretData: 'Welcome Admin to confidential dashboard!' }, 'Admin access granted')
    );
});

export default router;