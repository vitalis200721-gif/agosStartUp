const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

let onlineUsers = new Map(); // socketId -> { userId, displayName, avatar }

function initSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  // Authentication middleware – verify JWT before allowing connection
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) return next(new Error('Authentication required'));

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('displayName avatar level faction');
      if (!user) return next(new Error('User not found'));

      socket.userId = decoded.id;
      socket.userData = {
        id: decoded.id,
        displayName: user.displayName,
        avatar: user.avatar,
        level: user.level
      };
      next();
    } catch (err) {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`⚡ ${socket.userData.displayName} connected (${onlineUsers.size + 1} online)`);

    // Track this user
    onlineUsers.set(socket.id, socket.userData);

    // Broadcast updated online count to everyone
    io.emit('online_count', onlineUsers.size);

    // Send the user the recent chat history (last 50 messages, kept in memory)
    socket.emit('chat_history', chatHistory);

    // Handle incoming chat messages
    socket.on('send_message', (text) => {
      if (!text || typeof text !== 'string' || text.trim().length === 0) return;
      // Sanitize & limit length
      const cleanText = text.trim().slice(0, 300);

      const message = {
        id: Date.now() + '-' + socket.userId,
        userId: socket.userData.id,
        displayName: socket.userData.displayName,
        avatar: socket.userData.avatar,
        level: socket.userData.level,
        text: cleanText,
        timestamp: new Date().toISOString()
      };

      // Store in memory (keep last 50)
      chatHistory.push(message);
      if (chatHistory.length > 50) chatHistory.shift();

      // Broadcast to everyone
      io.emit('receive_message', message);
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log(`💤 ${socket.userData.displayName} disconnected (${onlineUsers.size - 1} online)`);
      onlineUsers.delete(socket.id);
      io.emit('online_count', onlineUsers.size);
    });
  });

  return io;
}

// In-memory chat history (resets on server restart, which is fine for now)
const chatHistory = [];

module.exports = { initSocket };
