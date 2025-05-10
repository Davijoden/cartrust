const path = require('path');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

// Load env vars
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

const app = require('./app');
const connectDB = require('./config/db');

// Connect to database
connectDB();

const PORT = process.env.PORT || 5000;

// Create HTTP server instead of letting Express do it internally
const httpServer = http.createServer(app);

// Initialize Socket.IO server
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:8081',
    methods: ['GET', 'POST']
  }
});

// When a client connects
io.on('connection', (socket) => {
  console.log(`⚡️ Socket.IO: Client connected [id=${socket.id}]`);

  // Optional: authenticate socket here if you passed token in connection
  // const { token } = socket.handshake.auth;
  // verify token…

  socket.on('disconnect', () => {
    console.log(`⚡️ Socket.IO: Client disconnected [id=${socket.id}]`);
  });
});

// Make io accessible to routes/controllers
app.set('io', io);

// Start the combined HTTP + Socket.IO server
httpServer.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  httpServer.close(() => process.exit(1));
});
