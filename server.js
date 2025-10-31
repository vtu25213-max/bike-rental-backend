// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000", // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Routes Import
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes');

// ✅ Routes Mount
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);

// ✅ Test Route
app.get('/', (req, res) => {
  res.send('✅ Backend running successfully!');
});

// ✅ Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
