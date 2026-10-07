import React, { useState } from 'react';
import { 
  Receipt, 
  Plus, 
  Trash2, 
  ArrowUpRight, 
  ArrowDownRight, 
  PieChart as PieIcon, 
  Calendar, 
  CreditCard,
  CheckCircle2,
  X
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { addExpense, deleteExpense } from '../services/api';

const ExpenseTracker = ({ expenseData, onRefresh }) => {
  const { analytics = {}, transactions = [] } = expenseData || {};
  const { totalIncome = 0, totalExpense = 0, netProfit = 0, profitMarginPercent = 0, categoryBreakdown = [] } = analytics;

  const [showModal, setShowModal] = useState(false);
  const [filterType, setFilterType] = useState('All'); // 'All' | 'Income' | 'Expense'

  const [txForm, setTxForm] = useState({
    type: 'Expense',
    category: 'Fertilizers & Soil',
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    paymentMode: 'Cash',
    plotId: 'General Farm'
  });

  const categoryColors = ['#059669', '#d97706', '#2563eb', '#9333ea', '#dc2626', '#0284c7'];

  const categoriesList = [
    'Seeds & Saplings',
    'Fertilizers & Soil',
    'Pesticides & Crop Protection',
    'Labor & Sowing',
    'Equipment & Fuel',
    'Crop Sale',
    'Government Subsidy',
    'Other'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await addExpense(txForm);
    if (res.success) {
      setShowModal(false);
      setTxForm({
        type: 'Expense',
        category: 'Fertilizers & Soil',
        description: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        paymentMode: 'Cash',
        plotId: 'General Farm'
      });
      if (onRefresh) onRefresh();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this financial record?')) {
      await deleteExpense(id);
      if (onRefresh) onRefresh();
    }
  };

  const filteredTransactions = transactions.filter(t => filterType === 'All' || t.type === filterType);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Receipt className="w-6 h-6 text-emerald-600" />
            Farm Financial Ledger & Profitability Analytics
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Track seed, fertilizer, labor costs against harvest crop sales & government subsidies.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-4 py-2.5 rounded-xl shadow text-xs flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          Record New Entry
        </button>
      </div>

      {/* Analytics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Revenue */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase">
            <span>Total Farm Revenue</span>
            <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg"><ArrowUpRight className="w-4 h-4" /></span>
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">₹{totalIncome.toLocaleString('en-IN')}</div>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">From crop sales & subsidies</p>
        </div>

        {/* Expenses */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase">
            <span>Total Cultivation Cost</span>
            <span className="p-1.5 bg-red-50 text-red-600 rounded-lg"><ArrowDownRight className="w-4 h-4" /></span>
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">₹{totalExpense.toLocaleString('en-IN')}</div>
          <p className="text-[11px] text-red-500 font-medium mt-1">Seeds, fertilizers, labor & fuel</p>
        </div>

        {/* Net Profit */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase">
            <span>Net Farm Profit</span>
            <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg"><Receipt className="w-4 h-4" /></span>
          </div>
          <div className={`mt-2 text-2xl font-bold ${netProfit >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>
            ₹{netProfit.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-slate-500 font-medium mt-1">Net gain after expenses</p>
        </div>

        {/* Profit Margin */}
        <div className="bg-emerald-800 text-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs font-medium text-emerald-200 uppercase">
            <span>Profit Margin</span>
            <span className="p-1.5 bg-emerald-700 rounded-lg"><PieIcon className="w-4 h-4 text-emerald-200" /></span>
          </div>
          <div className="mt-2 text-3xl font-bold">{profitMarginPercent}%</div>
          <p className="text-[11px] text-emerald-200 font-medium mt-1">High operational efficiency</p>
        </div>

      </div>

      {/* Main Grid: Category Chart + Ledger Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Pie Chart Box */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <PieIcon className="w-4 h-4 text-emerald-600" />
            Expense Breakdown by Category
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryBreakdown.length > 0 ? categoryBreakdown : [{ name: 'Seeds', value: 14500 }, { name: 'Fertilizer', value: 22800 }, { name: 'Labor', value: 18000 }]}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {(categoryBreakdown.length > 0 ? categoryBreakdown : [{ name: 'Seeds' }, { name: 'Fertilizer' }, { name: 'Labor' }]).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={categoryColors[index % categoryColors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(val) => `₹${val.toLocaleString('en-IN')}`} />
                <Legend iconSize={8} layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Ledger Table Box */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h3 className="text-base font-bold text-slate-900">Financial Ledger Transactions</h3>
            
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs">
              {['All', 'Income', 'Expense'].map((t) => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                    filterType === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto max-h-80 overflow-y-auto no-scrollbar">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[10px] tracking-wider sticky top-0">
                <tr>
                  <th className="px-3 py-2.5">Date & Description</th>
                  <th className="px-3 py-2.5">Category</th>
                  <th className="px-3 py-2.5 text-right">Amount</th>
                  <th className="px-3 py-2.5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50">
                    <td className="px-3 py-3">
                      <span className="font-bold text-slate-900 block">{tx.description}</span>
                      <span className="text-[10px] text-slate-400">{tx.date} &bull; {tx.paymentMode}</span>
                    </td>
                    <td className="px-3 py-3 font-medium">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        tx.type === 'Income' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {tx.category}
                      </span>
                    </td>
                    <td className={`px-3 py-3 text-right font-extrabold text-sm ${
                      tx.type === 'Income' ? 'text-emerald-600' : 'text-slate-900'
                    }`}>
                      {tx.type === 'Income' ? '+' : '-'}₹{Number(tx.amount).toLocaleString('en-IN')}
                    </td>
                    <td className="px-3 py-3 text-center">
                      <button
                        onClick={() => handleDelete(tx.id)}
                        className="text-slate-400 hover:text-red-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>

      {/* Add Transaction Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">Record Financial Transaction</h3>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Type</label>
                  <select
                    value={txForm.type}
                    onChange={(e) => setTxForm({ ...txForm, type: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="Expense">Expense (Cost)</option>
                    <option value="Income">Income (Revenue)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={txForm.category}
                    onChange={(e) => setTxForm({ ...txForm, category: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    {categoriesList.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description</label>
                <input
                  type="text"
                  required
                  placeholder="E.g., Certified Wheat Lok-1 Seeds"
                  value={txForm.description}
                  onChange={(e) => setTxForm({ ...txForm, description: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Amount (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="E.g., 14500"
                    value={txForm.amount}
                    onChange={(e) => setTxForm({ ...txForm, amount: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Payment Method</label>
                  <select
                    value={txForm.paymentMode}
                    onChange={(e) => setTxForm({ ...txForm, paymentMode: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="Cash">Cash</option>
                    <option value="UPI / GPay">UPI / GPay</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Credit / Kisan Card">Kisan Credit Card</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 rounded-xl shadow transition-colors text-xs"
              >
                Record Entry
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ExpenseTracker;
