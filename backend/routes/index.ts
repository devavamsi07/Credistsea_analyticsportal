import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();

// Health check or root endpoint
router.get('/', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Backend API running' });
});

export default router;
