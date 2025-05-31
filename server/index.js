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

// Start server with port handling
const findAvailablePort = (startPort) => {
    return new Promise((resolve, reject) => {
        let port = startPort;
        const server = express()
            .listen(port)
            .on('listening', () => {
                server.close(() => resolve(port));
            })
            .on('error', (err) => {
                if (err.code === 'EADDRINUSE') {
                    port++;
                    server.listen(port);
                } else {
                    reject(err);
                }
            });
    });
};

const startServer = async () => {
    try {
        // Kill any existing process on port 5000 (Windows only)
        if (process.platform === 'win32') {
            try {
                await new Promise((resolve, reject) => {
                    require('child_process').exec('netstat -ano | findstr :5000', (error, stdout, stderr) => {
                        if (stdout) {
                            const pid = stdout.split(/\s+/)[4];
                            require('child_process').exec(`taskkill /F /PID ${pid}`, (error) => {
                                if (error) {
                                    console.log('No process to kill on port 5000');
                                }
                                resolve();
                            });
                        } else {
                            resolve();
                        }
                    });
                });
            } catch (error) {
                console.log('Error killing process:', error);
            }
        }

        const PORT = await findAvailablePort(process.env.PORT || 5000);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer(); 