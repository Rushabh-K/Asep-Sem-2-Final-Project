const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/foodlink', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const ngoRoutes = require('./routes/ngos');
const chatbotRoutes = require('./routes/chatbot');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ngos', ngoRoutes);
app.use('/api/chatbot', chatbotRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Function to check if a port is in use
const isPortInUse = (port) => {
    return new Promise((resolve) => {
        const server = express()
            .listen(port)
            .on('listening', () => {
                server.close();
                resolve(false);
            })
            .on('error', (err) => {
                if (err.code === 'EADDRINUSE') {
                    resolve(true);
                }
            });
    });
};

// Function to find next available port
const findAvailablePort = async (startPort, maxAttempts = 10) => {
    let port = startPort;
    let attempts = 0;

    while (attempts < maxAttempts) {
        const inUse = await isPortInUse(port);
        if (!inUse) {
            return port;
        }
        port++;
        attempts++;
    }
    throw new Error(`Could not find an available port after ${maxAttempts} attempts`);
};

const startServer = async () => {
    try {
        const preferredPort = process.env.PORT || 5000;
        const port = await findAvailablePort(preferredPort);
        
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
            if (port !== preferredPort) {
                console.log(`Note: Original port ${preferredPort} was in use, using port ${port} instead`);
            }
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('Received SIGTERM. Performing graceful shutdown...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('Received SIGINT. Performing graceful shutdown...');
    process.exit(0);
});

startServer(); 