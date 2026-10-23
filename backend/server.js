import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectBD from './config/db.js';
import mongoose from 'mongoose';

dotenv.config();
connectBD();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'College ERP Server is running successfully!',
        timestamp: new Date().toISOString()
    });
});

app.get('/', (req, res) => {
    res.send('Welcome to Colleege ERP Backend API');
});

app.listen(PORT, () => {
    console.log(`server running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`);
});

app.get('/api/test-db', async (req, res) => {
    try {
        const dbState = mongoose.connection.readyState;
        const states = ['Disconnecte', 'Connected', 'Connecting', 'Disconnecting'];

        return res.status(200).json({
            success: true,
            message: "MongoDB Atles live verification",
            databaseState: states[dbState] || 'Unknown',
            host: mongoose.Connection.host || 'Not connected',
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
