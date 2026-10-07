import express from 'express';
import { mockWeather } from '../data/mockData.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    success: true,
    data: mockWeather
  });
});

export default router;
