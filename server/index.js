import express from 'express';
import cors from 'cors';
import weatherRouter from './routes/weather.js';
import marketRouter from './routes/market.js';
import pestRouter from './routes/pest.js';
import inventoryRouter from './routes/inventory.js';
import expenseRouter from './routes/expense.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/weather', weatherRouter);
app.use('/api/market', marketRouter);
app.use('/api/pest', pestRouter);
app.use('/api/inventory', inventoryRouter);
app.use('/api/expenses', expenseRouter);

// Root route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    appName: 'Gunda Plant Platform Backend Server',
    time: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🌾 Gunda Plant Platform Backend Server running on http://localhost:${PORT}`);
});
