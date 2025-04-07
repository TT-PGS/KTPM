import express from 'express';
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

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins (adjust this for production)
    methods: ['GET', 'POST'],
  },
});

app.use(express.json());
app.use(cors());
// Middleware to attach `io` to `req`
app.use((req, res, next) => {
  req.io = io;
  next();
});

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


// import express from 'express';
// import { Server } from 'socket.io';
// const app = express();
// import dotenv from 'dotenv';
// import morgan from 'morgan';
// import connectDb from './db.js';
// import cors from 'cors';
// dotenv.config();

// import userRoutes from './routes/userRoutes.js';
// import friendRoutes from './routes/friendRoutes.js';
// import conversationRoutes from './routes/conversationRoutes.js';

// connectDb();

// app.use(express.json());
// app.use(morgan('dev'));
// app.use(cors());


// // Routes user
// app.use('/api/users', userRoutes);
// // Routes friend
// app.use('/api/friends', friendRoutes);
// // Routes conversation
// app.use('/api/conversations', conversationRoutes);

// app.get('/', (req, res) => {
//   res.json({ message: 'Hello World' });
// });

// const PORT = process.env.PORT;

// app.listen(PORT, () => console.log(`Server is Running on Port ${PORT}`));
