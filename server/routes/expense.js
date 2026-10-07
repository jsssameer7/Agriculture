import express from 'express';
import { initialExpenses } from '../data/mockData.js';

const router = express.Router();
let expenses = [...initialExpenses];

// GET financial ledger and analytics
router.get('/', (req, res) => {
  const totalIncome = expenses.filter(e => e.type === 'Income').reduce((acc, curr) => acc + Number(curr.amount), 0);
  const totalExpense = expenses.filter(e => e.type === 'Expense').reduce((acc, curr) => acc + Number(curr.amount), 0);
  const netProfit = totalIncome - totalExpense;

  // Category breakdown for expenses
  const categoryTotals = {};
  expenses.filter(e => e.type === 'Expense').forEach(e => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + Number(e.amount);
  });

  const categoryBreakdown = Object.keys(categoryTotals).map(cat => ({
    name: cat,
    value: categoryTotals[cat]
  }));

  res.json({
    success: true,
    analytics: {
      totalIncome,
      totalExpense,
      netProfit,
      profitMarginPercent: totalIncome > 0 ? ((netProfit / totalIncome) * 100).toFixed(1) : 0,
      categoryBreakdown
    },
    transactions: expenses
  });
});

// POST Add financial record (Income or Expense)
router.post('/', (req, res) => {
  const { type, category, description, amount, date, plotId, paymentMode } = req.body;

  if (!amount || isNaN(amount)) {
    return res.status(400).json({ success: false, message: 'Valid amount is required' });
  }

  const newRecord = {
    id: `tx-${Date.now()}`,
    type: type || 'Expense',
    category: category || 'Other',
    description: description || 'Farm transaction',
    amount: Number(amount),
    date: date || new Date().toISOString().split('T')[0],
    plotId: plotId || 'General',
    paymentMode: paymentMode || 'Cash'
  };

  expenses.unshift(newRecord);
  res.status(201).json({
    success: true,
    message: `${newRecord.type} recorded successfully`,
    transaction: newRecord
  });
});

// DELETE transaction
router.delete('/:id', (req, res) => {
  expenses = expenses.filter(e => e.id !== req.params.id);
  res.json({ success: true, message: 'Transaction removed' });
});

export default router;
