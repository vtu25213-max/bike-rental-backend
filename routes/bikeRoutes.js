const express = require('express');
const router = express.Router();
const Bike = require('../models/Bike');

// GET all bikes
router.get('/', async (req, res) => {
  try {
    const bikes = await Bike.find();
    res.json(bikes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bikes' });
  }
});

// POST book a bike
router.post('/book/:id', async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);
    if (!bike || !bike.available) {
      return res.status(400).json({ error: 'Bike not available' });
    }
    bike.available = false;
    await bike.save();
    res.json({ message: 'Bike booked successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Booking failed' });
  }
});

module.exports = router;
