const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Bike = require('./models/Bike');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const bikes = [
  { name: 'Hero Sprint', type: 'Mountain', price: 150, available: true },
  { name: 'Firefox Roadster', type: 'Road', price: 200, available: true },
  { name: 'Btwin MyBike', type: 'Hybrid', price: 180, available: true },
  { name: 'Giant Escape', type: 'City', price: 220, available: true }
];

const seedBikes = async () => {
  try {
    await Bike.deleteMany();
    await Bike.insertMany(bikes);
    console.log('Sample bikes inserted');
    mongoose.disconnect();
  } catch (err) {
    console.error('Seeding failed:', err);
  }
};

seedBikes();
