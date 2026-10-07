import React, { useState } from 'react';
import { 
  TrendingUp, 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownRight, 
  Minus, 
  Calendar,
  Building2,
  MapPin,
  BarChart2
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const MarketPrices = ({ marketPrices }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedItemForChart, setSelectedItemForChart] = useState(marketPrices[0] || null);

  const states = ['All', 'Madhya Pradesh', 'Haryana', 'Gujarat', 'Karnataka', 'Uttar Pradesh', 'Maharashtra'];
  const categories = ['All', 'Cereals', 'Cash Crops', 'Oilseeds', 'Vegetables'];

  const filteredPrices = (marketPrices || []).filter((item) => {
    const matchesSearch = !searchQuery || 
      item.crop.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.mandi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.district.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesState = selectedState === 'All' || item.state.toLowerCase() === selectedState.toLowerCase();
    const matchesCategory = selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesState && matchesCategory;
  });

  const chartData = (selectedItemForChart?.history || [2400, 2420, 2450, 2480, 2500, 2520, 2540]).map((price, idx) => ({
    day: `Day ${idx + 1}`,
    price
  }));

  return (
    <div className="space-y-6">
      {/* Page Title Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
            Live Mandi Commodity Market Prices
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time APMC Mandi rates across states. Monitor price trends before selling your harvest.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold bg-emerald-50 text-emerald-800 px-3.5 py-2 rounded-xl border border-emerald-200">
          <Calendar className="w-4 h-4 text-emerald-600" />
          <span>Rates Updated Today (2026-10-07)</span>
        </div>
      </div>

      {/* Main Grid: Chart + Filtered Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Price Trend Chart Box */}
        {selectedItemForChart && (
          <div className="lg:col-span-12 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">7-Day Price Trajectory</span>
                <h3 className="text-lg font-extrabold text-slate-900">
                  {selectedItemForChart.crop} &bull; {selectedItemForChart.mandi} ({selectedItemForChart.state})
                </h3>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-slate-900">₹{selectedItemForChart.modalPrice}</span>
                <span className="text-xs text-slate-500 ml-1">/ {selectedItemForChart.unit}</span>
                <div className={`text-xs font-bold flex items-center justify-end ${
                  selectedItemForChart.change > 0 ? 'text-emerald-600' : selectedItemForChart.change < 0 ? 'text-red-600' : 'text-slate-500'
                }`}>
                  {selectedItemForChart.change > 0 ? (
                    <><ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +₹{selectedItemForChart.change}</>
                  ) : selectedItemForChart.change < 0 ? (
                    <><ArrowDownRight className="w-3.5 h-3.5 mr-0.5" /> ₹{selectedItemForChart.change}</>
                  ) : (
                    <><Minus className="w-3.5 h-3.5 mr-0.5" /> Stable</>
                  )}
                </div>
              </div>
            </div>

            {/* Recharts Area Chart */}
            <div className="h-56 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                  <YAxis domain={['auto', 'auto']} tick={{ fontSize: 11 }} />
                  <Tooltip 
                    formatter={(val) => [`₹${val}`, 'Modal Price']}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#059669" 
                    strokeWidth={2.5} 
                    fillOpacity={1} 
                    fill="url(#priceGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Filters and Search Bar */}
        <div className="lg:col-span-12 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search crop or APMC Mandi..."
                className="w-full text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            {/* State Select */}
            <div>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
              >
                <option value="All">All States</option>
                {states.filter(s => s !== 'All').map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Category Select */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
              >
                <option value="All">All Crop Categories</option>
                {categories.filter(c => c !== 'All').map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Commodity Prices Table */}
        <div className="lg:col-span-12 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[11px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3.5">Crop Name</th>
                  <th className="px-5 py-3.5">APMC Mandi</th>
                  <th className="px-5 py-3.5">State & District</th>
                  <th className="px-5 py-3.5">Min Price</th>
                  <th className="px-5 py-3.5">Max Price</th>
                  <th className="px-5 py-3.5">Modal Price</th>
                  <th className="px-5 py-3.5 text-right">Day Trend</th>
                  <th className="px-5 py-3.5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPrices.map((item) => {
                  const isSelected = selectedItemForChart?.id === item.id;
                  return (
                    <tr 
                      key={item.id}
                      className={`hover:bg-emerald-50/50 transition-colors ${isSelected ? 'bg-emerald-50/70 font-semibold' : ''}`}
                    >
                      <td className="px-5 py-4 font-bold text-slate-900">
                        {item.crop}
                        <span className="block text-[10px] font-normal text-slate-400">{item.category}</span>
                      </td>
                      <td className="px-5 py-4 font-medium text-slate-700 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        {item.mandi}
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{item.district}, {item.state}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-slate-600">₹{item.minPrice}</td>
                      <td className="px-5 py-4 text-slate-600">₹{item.maxPrice}</td>
                      <td className="px-5 py-4 font-extrabold text-slate-900 text-sm">
                        ₹{item.modalPrice}
                        <span className="text-[10px] font-medium text-slate-400"> /{item.unit}</span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <span className={`inline-flex items-center font-bold px-2 py-0.5 rounded ${
                          item.change > 0 ? 'bg-emerald-100 text-emerald-700' : item.change < 0 ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {item.change > 0 ? `+₹${item.change}` : item.change < 0 ? `-₹${Math.abs(item.change)}` : '0'}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <button
                          onClick={() => setSelectedItemForChart(item)}
                          className="px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-800 hover:bg-emerald-900 text-white transition-colors"
                        >
                          View Graph
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MarketPrices;
