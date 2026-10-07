import React from 'react';
import { 
  Bug, 
  TrendingUp, 
  Layers, 
  Receipt, 
  CloudSun, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowDownRight,
  Sprout,
  PlusCircle,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';

const Dashboard = ({ 
  setActiveTab, 
  weather, 
  marketPrices, 
  inventoryData, 
  expenseData 
}) => {
  const { summary: invSummary = {}, plots = [], harvestInventory = [] } = inventoryData || {};
  const { analytics = {} } = expenseData || {};

  const topGainers = [...(marketPrices || [])].sort((a, b) => b.change - a.change).slice(0, 3);
  const recentHarvest = harvestInventory.slice(0, 2);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
          <Sprout className="w-64 h-64" />
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-emerald-900/60 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-emerald-200 mb-3 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Smart Agriculture Hub &bull; Active Season 2026
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Welcome back, Farmer Sameer 👋
          </h1>
          <p className="mt-2 text-sm sm:text-base text-emerald-100 leading-relaxed">
            Monitor crop health with AI disease detection, track real-time Mandi market prices, manage land plots, and maximize farm profitability.
          </p>
          
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('pest')}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold px-4 py-2.5 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 text-sm"
            >
              <Bug className="w-4 h-4 text-slate-950" />
              Scan Plant Disease
            </button>
            <button
              onClick={() => setActiveTab('market')}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-2.5 rounded-xl border border-white/20 transition-all text-sm"
            >
              <TrendingUp className="w-4 h-4 text-emerald-300" />
              Check Mandi Rates
            </button>
            <button
              onClick={() => setActiveTab('expenses')}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-2.5 rounded-xl border border-white/20 transition-all text-sm"
            >
              <Receipt className="w-4 h-4 text-emerald-300" />
              Record Expense
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Land Metric */}
        <div 
          onClick={() => setActiveTab('inventory')}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Cultivated Area</span>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-bold text-slate-900">{invSummary.totalLandAreaAcres || 9.7}</span>
            <span className="text-sm font-medium text-slate-500 ml-1">Acres</span>
          </div>
          <p className="mt-2 text-xs text-emerald-700 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            {invSummary.totalPlots || 3} Active Land Plots
          </p>
        </div>

        {/* Harvest Inventory Metric */}
        <div 
          onClick={() => setActiveTab('inventory')}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Harvest Stock Value</span>
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Sprout className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-bold text-slate-900">₹{(invSummary.estimatedInventoryValue || 1197650).toLocaleString('en-IN')}</span>
          </div>
          <p className="mt-2 text-xs text-slate-500 font-medium">
            {invSummary.totalStockBatches || 3} Grain batches stored in silos
          </p>
        </div>

        {/* Net Profit Metric */}
        <div 
          onClick={() => setActiveTab('expenses')}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Net Farm Profit</span>
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Receipt className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-bold text-slate-900">
              ₹{((analytics.netProfit !== undefined ? analytics.netProfit : 57800)).toLocaleString('en-IN')}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs">
            <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              +{analytics.profitMarginPercent || 43.3}% Margin
            </span>
            <span className="text-slate-400">YTD Revenue</span>
          </div>
        </div>

        {/* Weather Advisory Summary */}
        <div 
          onClick={() => setActiveTab('weather')}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Weather & Soil</span>
            <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors">
              <CloudSun className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">{weather?.temperature || 28}°C</span>
            <span className="text-sm font-medium text-slate-600">{weather?.condition || 'Partly Cloudy'}</span>
          </div>
          <p className="mt-2 text-xs text-sky-700 font-medium">
            Soil Moisture: {weather?.soilMoisture || '68% (Good)'}
          </p>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Quick Disease Scan & Active Plots */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Disease Scanner Card */}
          <div className="bg-gradient-to-br from-amber-500/10 via-amber-50/40 to-emerald-500/10 rounded-2xl p-6 border border-amber-200/70 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3.5 bg-amber-500 text-slate-950 rounded-2xl shadow-sm shrink-0">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Spotted abnormal leaves or pest activity?</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Upload plant photo or describe symptoms. Get instant organic & chemical treatment recommendations.
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('pest')}
              className="w-full sm:w-auto shrink-0 bg-slate-900 hover:bg-slate-800 text-white font-medium px-5 py-2.5 rounded-xl shadow text-sm flex items-center justify-center gap-2 transition-transform transform active:scale-95"
            >
              <span>Diagnose Now</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Active Plots Overview */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Active Farm Land Plots</h3>
                <p className="text-xs text-slate-500">Current crop progress & soil conditions</p>
              </div>
              <button 
                onClick={() => setActiveTab('inventory')}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                Manage All Plots <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {plots.slice(0, 2).map((plot) => (
                <div key={plot.id} className="bg-slate-50/80 rounded-xl p-4 border border-slate-200/60 hover:border-emerald-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-800 text-sm">{plot.name}</h4>
                    <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                      {plot.crop}
                    </span>
                  </div>
                  <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Area:</span>
                      <span className="font-semibold text-slate-800">{plot.areaAcres} Acres ({plot.soilType})</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Current Stage:</span>
                      <span className="font-semibold text-emerald-700">{plot.stage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Expected Harvest:</span>
                      <span className="font-medium text-slate-700">{plot.expectedHarvest}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Mandi Rates & Weather Alerts */}
        <div className="space-y-6">
          
          {/* Top Mandi Prices Ticker */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                Live Mandi Price Gainers
              </h3>
              <button 
                onClick={() => setActiveTab('market')}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                View Mandi <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {topGainers.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{item.crop}</h4>
                    <p className="text-[11px] text-slate-500">{item.mandi}, {item.state}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-slate-900">₹{item.modalPrice} <span className="text-[10px] text-slate-500">/{item.unit}</span></div>
                    <div className="flex items-center justify-end text-[11px] font-semibold text-emerald-600">
                      <ArrowUpRight className="w-3 h-3 mr-0.5" />
                      +₹{item.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Weather Advisories */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <CloudSun className="w-4 h-4 text-sky-600" />
              Today's Field Advisories
            </h3>
            <div className="space-y-2.5 text-xs">
              {(weather?.advisory || []).map((adv, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-sky-50/70 border border-sky-100 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-800 block">{adv.title}</span>
                    <span className="text-slate-600 mt-0.5 block">{adv.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;
