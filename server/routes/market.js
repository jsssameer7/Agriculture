import express from 'express';
import { mockMarketPrices } from '../data/mockData.js';

const router = express.Router();
let marketPrices = [...mockMarketPrices];

// GET all market prices with optional filtering
router.get('/', (req, res) => {
  const { search, state, category } = req.query;
  let results = [...marketPrices];

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(item => 
      item.crop.toLowerCase().includes(q) ||
      item.mandi.toLowerCase().includes(q) ||
      item.district.toLowerCase().includes(q)
    );
  }

  if (state && state !== 'All') {
    results = results.filter(item => item.state.toLowerCase() === state.toLowerCase());
  }

  if (category && category !== 'All') {
    results = results.filter(item => item.category.toLowerCase() === category.toLowerCase());
  }

  res.json({
    success: true,
    total: results.length,
    data: results
  });
});

// GET price trajectory / trends summary
router.get('/summary', (req, res) => {
  const topGainers = [...marketPrices].sort((a, b) => b.change - a.change).slice(0, 3);
  const categories = [...new Set(marketPrices.map(m => m.category))];
  res.json({
    success: true,
    topGainers,
    categories,
    lastUpdate: new Date().toISOString().split('T')[0]
  });
});

export default router;
