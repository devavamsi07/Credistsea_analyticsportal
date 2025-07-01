import express, { Request, Response } from 'express';
import Event from '../models/Event.js';
const router = express.Router();

// POST /events - Ingest user activity events
router.post('/events', async (req: Request, res: Response) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json({ message: 'Event stored', event });
  } catch (err) {
    res.status(400).json({ error: 'Invalid event data', details: err });
  }
});

// GET /analytics - Return aggregated analytics
router.get('/analytics', async (req: Request, res: Response) => {
  try {
    // Example: Aggregate by page, eventType, and userId
    const { page, userId, eventType, from, to } = req.query;
    const match: any = {};
    if (page) match.page = page;
    if (userId) match.userId = userId;
    if (eventType) match.eventType = eventType;
    if (from || to) match.timestamp = {};
    if (from) match.timestamp.$gte = new Date(from as string);
    if (to) match.timestamp.$lte = new Date(to as string);

    const analytics = await Event.aggregate([
      { $match: match },
      {
        $group: {
          _id: { page: '$page', eventType: '$eventType', userId: '$userId' },
          count: { $sum: 1 },
          lastEvent: { $max: '$timestamp' },
        },
      },
      { $sort: { 'lastEvent': -1 } },
    ]);
    res.json({ analytics });
  } catch (err) {
    res.status(500).json({ error: 'Failed to aggregate analytics', details: err });
  }
});

export default router;
