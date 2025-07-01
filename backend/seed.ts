import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Event from './models/Event.js';
dotenv.config();

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/creditsea';

const sampleEvents = [
  {
    userId: 'user1',
    sessionId: 'sess1',
    page: 'home',
    eventType: 'visit',
    eventData: {},
    timestamp: new Date(),
    synced: true,
  },
  {
    userId: 'user1',
    sessionId: 'sess1',
    page: 'about',
    eventType: 'visit',
    eventData: {},
    timestamp: new Date(),
    synced: true,
  },
  {
    userId: 'user2',
    sessionId: 'sess2',
    page: 'home',
    eventType: 'click',
    eventData: { button: 'start' },
    timestamp: new Date(),
    synced: true,
  },
];

async function seed() {
  await mongoose.connect(mongoUri);
  await Event.deleteMany({});
  await Event.insertMany(sampleEvents);
  console.log('Seeded sample events');
  await mongoose.disconnect();
}

seed(); 