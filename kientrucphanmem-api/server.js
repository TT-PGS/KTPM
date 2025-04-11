import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDb from './db.js';

import userRoutes from './routes/userRoutes.js';
import friendRoutes from './routes/friendRoutes.js';
import conversationRoutes from './routes/conversationRoutes.js';

dotenv.config();
connectDb();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log('dirname-------------------------', __dirname);

const app = express();

// Increase payload size limit

// Serve static files from the 'uploads' folder
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins (adjust this for production)
    // methods: ['GET', 'POST'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allow cookies and credentials
  },
});

// app.use(express.json());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

app.use(cors());
// Middleware to attach `io` to `req`
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/conversations', conversationRoutes);



// Socket.IO setup
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Join a specific conversation room
  socket.on('joinRoom', (conversationId) => {
    socket.join(conversationId);
    console.log(`User joined room: ${conversationId}`);
  });

  // Listen for new messages and broadcast them to the room
  // socket.on('newMessage', () => {
  //   const { conversationId } = message;
  //   console.log('newMessage-----------------------------', message);
  //   io.to(conversationId).emit('messageReceived', message);
  // });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
