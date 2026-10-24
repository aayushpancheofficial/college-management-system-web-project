import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import connectDB from './src/config/db.js';

dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Base Route
app.get('/', (req, res) => {
  res.send('Welcome to College ERP Backend API');
});

// Health Check API Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'College ERP Server is running successfully!',
    timestamp: new Date().toISOString()
  });
});

// Live Database Ping Verification Route
app.get('/api/test-db', async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState;
    const states = ['Disconnected', 'Connected', 'Connecting', 'Disconnecting'];
    const isConnected = dbState === 1;

    return res.status(isConnected ? 200 : 503).json({
      success: isConnected,
      message: isConnected ? 'MongoDB Atlas is connected' : 'MongoDB Atlas not connected',
      databaseState: states[dbState] || 'Unknown',
      host: mongoose.connection.host || 'Not connected',
      databaseName: mongoose.connection.name || 'None',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Database check failed',
      error: error.message
    });
  }
});

// ==========================================
// 🧪 MONGODB TESTING: Schema & Model
// ==========================================
const testStudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNo: { type: String, required: true },
  department: { type: String, default: 'Computer Science' },
  createdAt: { type: Date, default: Date.now }
});

const TestStudent = mongoose.model('TestStudent', testStudentSchema);

// 1. Data Save (CREATE) Test Route
app.post('/api/test-student', async (req, res) => {
  try {
    const { name, rollNo, department } = req.body;
    const newStudent = await TestStudent.create({
      name,
      rollNo,
      department
    });

    return res.status(201).json({
      success: true,
      message: 'Student successfully saved in MongoDB Atlas!',
      data: newStudent
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error saving data',
      error: error.message
    });
  }
});

// 2. Saved Data (READ) Test Route
app.get('/api/test-students', async (req, res) => {
  try {
    const students = await TestStudent.find();
    return res.status(200).json({
      success: true,
      totalStudents: students.length,
      data: students
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Start Server Listener
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`);
});
