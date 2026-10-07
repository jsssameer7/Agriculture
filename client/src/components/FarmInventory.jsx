import React, { useState } from 'react';
import { 
  Layers, 
  Sprout, 
  Plus, 
  Trash2, 
  Calendar, 
  MapPin, 
  Warehouse, 
  CheckCircle, 
  AlertCircle,
  FileText,
  X
} from 'lucide-react';
import { addOrUpdatePlot, deletePlot, addOrUpdateHarvest, deleteHarvest } from '../services/api';

const FarmInventory = ({ inventoryData, onRefresh }) => {
  const { summary = {}, plots = [], harvestInventory = [] } = inventoryData || {};
  const [activeTab, setActiveTab] = useState('plots'); // 'plots' | 'harvest'

  // Modal States
  const [showPlotModal, setShowPlotModal] = useState(false);
  const [showHarvestModal, setShowHarvestModal] = useState(false);

  // Plot Form
  const [plotForm, setPlotForm] = useState({
    name: '',
    crop: '',
    areaAcres: '',
    soilType: 'Black Cotton Soil',
    sowingDate: new Date().toISOString().split('T')[0],
    expectedHarvest: '',
    stage: 'Sowing',
    healthStatus: 'Good',
    irrigationType: 'Drip Irrigation',
    notes: ''
  });

  // Harvest Form
  const [harvestForm, setHarvestForm] = useState({
    crop: '',
    variety: '',
    quantity: '',
    unit: 'Quintals',
    harvestDate: new Date().toISOString().split('T')[0],
    storageLocation: 'On-Farm Warehouse',
    grade: 'Grade A',
    sellingStatus: 'Stored',
    estimatedMarketValue: '',
    qualityNotes: ''
  });

  const handlePlotSubmit = async (e) => {
    e.preventDefault();
    const res = await addOrUpdatePlot(plotForm);
    if (res.success) {
      setShowPlotModal(false);
      setPlotForm({
        name: '',
        crop: '',
        areaAcres: '',
        soilType: 'Black Cotton Soil',
        sowingDate: new Date().toISOString().split('T')[0],
        expectedHarvest: '',
        stage: 'Sowing',
        healthStatus: 'Good',
        irrigationType: 'Drip Irrigation',
        notes: ''
      });
      if (onRefresh) onRefresh();
    }
  };

  const handleHarvestSubmit = async (e) => {
    e.preventDefault();
    const res = await addOrUpdateHarvest(harvestForm);
    if (res.success) {
      setShowHarvestModal(false);
      setHarvestForm({
        crop: '',
        variety: '',
        quantity: '',
        unit: 'Quintals',
        harvestDate: new Date().toISOString().split('T')[0],
        storageLocation: 'On-Farm Warehouse',
        grade: 'Grade A',
        sellingStatus: 'Stored',
        estimatedMarketValue: '',
        qualityNotes: ''
      });
      if (onRefresh) onRefresh();
    }
  };

  const handleDeletePlot = async (id) => {
    if (window.confirm('Are you sure you want to delete this land plot?')) {
      await deletePlot(id);
      if (onRefresh) onRefresh();
    }
  };

  const handleDeleteHarvest = async (id) => {
    if (window.confirm('Are you sure you want to delete this harvest record?')) {
      await deleteHarvest(id);
      if (onRefresh) onRefresh();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Metrics */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-6 h-6 text-emerald-600" />
            Land Plots & Harvest Storage Inventory
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Track active crop land parcels, soil conditions, harvest schedules, and stored grain batches.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab('plots')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'plots'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            Land Plots ({plots.length})
          </button>
          <button
            onClick={() => setActiveTab('harvest')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'harvest'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Warehouse className="w-3.5 h-3.5 text-amber-600" />
            Harvest Storage ({harvestInventory.length})
          </button>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-emerald-800 text-white rounded-2xl p-5 shadow-sm">
          <span className="text-xs text-emerald-200 font-medium uppercase tracking-wider">Total Farm Land</span>
          <div className="mt-1 text-3xl font-bold">{summary.totalLandAreaAcres || 9.7} <span className="text-sm font-medium">Acres</span></div>
          <span className="text-xs text-emerald-200 mt-1 block">{plots.length} Cultivated Plots</span>
        </div>

        <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm">
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Stored Harvest Value</span>
          <div className="mt-1 text-3xl font-bold">₹{(summary.estimatedInventoryValue || 1197650).toLocaleString('en-IN')}</div>
          <span className="text-xs text-slate-400 mt-1 block">{harvestInventory.length} Storage Batches</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-bold uppercase">Quick Action</span>
            <p className="text-xs text-slate-600 mt-1">Register new land parcel or harvest batch</p>
          </div>
          <button
            onClick={() => activeTab === 'plots' ? setShowPlotModal(true) : setShowHarvestModal(true)}
            className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-4 py-2.5 rounded-xl shadow text-xs flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Add {activeTab === 'plots' ? 'Plot' : 'Harvest Batch'}
          </button>
        </div>
      </div>

      {/* Plots Tab */}
      {activeTab === 'plots' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {plots.map((plot) => (
            <div key={plot.id} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4 hover:border-emerald-300 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{plot.name}</h3>
                  <span className="inline-block mt-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {plot.crop}
                  </span>
                </div>
                <button
                  onClick={() => handleDeletePlot(plot.id)}
                  className="text-slate-400 hover:text-red-500 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-500">Area & Soil:</span>
                  <span className="font-semibold text-slate-800">{plot.areaAcres} Acres ({plot.soilType})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Sowing Date:</span>
                  <span className="font-medium text-slate-700">{plot.sowingDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Expected Harvest:</span>
                  <span className="font-medium text-slate-700">{plot.expectedHarvest}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Crop Stage:</span>
                  <span className="font-bold text-emerald-700">{plot.stage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Irrigation System:</span>
                  <span className="font-medium text-slate-700">{plot.irrigationType}</span>
                </div>
              </div>

              {plot.notes && (
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px] text-slate-600 italic">
                  "{plot.notes}"
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Harvest Inventory Tab */}
      {activeTab === 'harvest' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[11px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3.5">Crop & Variety</th>
                  <th className="px-5 py-3.5">Stock Quantity</th>
                  <th className="px-5 py-3.5">Storage Location</th>
                  <th className="px-5 py-3.5">Quality Grade</th>
                  <th className="px-5 py-3.5">Sale Status</th>
                  <th className="px-5 py-3.5">Estimated Value</th>
                  <th className="px-5 py-3.5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {harvestInventory.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4 font-bold text-slate-900">
                      {item.crop}
                      <span className="block text-[11px] font-normal text-slate-500">{item.variety}</span>
                    </td>
                    <td className="px-5 py-4 font-bold text-slate-800 text-sm">
                      {item.quantity} {item.unit}
                    </td>
                    <td className="px-5 py-4 text-slate-600 font-medium">
                      {item.storageLocation}
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                        {item.grade}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-medium text-slate-700">
                      {item.sellingStatus}
                    </td>
                    <td className="px-5 py-4 font-extrabold text-slate-900 text-sm">
                      ₹{item.estimatedMarketValue ? item.estimatedMarketValue.toLocaleString('en-IN') : 'N/A'}
                    </td>
                    <td className="px-5 py-4 text-center">
                      <button
                        onClick={() => handleDeleteHarvest(item.id)}
                        className="text-slate-400 hover:text-red-600 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Plot Modal */}
      {showPlotModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">Register New Land Plot</h3>
              <button onClick={() => setShowPlotModal(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>

            <form onSubmit={handlePlotSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Plot Name</label>
                <input
                  type="text"
                  required
                  placeholder="E.g., North Acre Field"
                  value={plotForm.name}
                  onChange={(e) => setPlotForm({ ...plotForm, name: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Crop</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Wheat Lok-1"
                    value={plotForm.crop}
                    onChange={(e) => setPlotForm({ ...plotForm, crop: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Area (Acres)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    placeholder="E.g., 3.5"
                    value={plotForm.areaAcres}
                    onChange={(e) => setPlotForm({ ...plotForm, areaAcres: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Soil Type</label>
                  <select
                    value={plotForm.soilType}
                    onChange={(e) => setPlotForm({ ...plotForm, soilType: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="Black Cotton Soil">Black Cotton Soil</option>
                    <option value="Alluvial Loam">Alluvial Loam</option>
                    <option value="Red Clay Loam">Red Clay Loam</option>
                    <option value="Sandy Soil">Sandy Soil</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Irrigation System</label>
                  <select
                    value={plotForm.irrigationType}
                    onChange={(e) => setPlotForm({ ...plotForm, irrigationType: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="Drip Irrigation">Drip Irrigation</option>
                    <option value="Sprinkler System">Sprinkler System</option>
                    <option value="Canal / Flood">Canal / Flood</option>
                    <option value="Rainfed">Rainfed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Sowing Date</label>
                  <input
                    type="date"
                    value={plotForm.sowingDate}
                    onChange={(e) => setPlotForm({ ...plotForm, sowingDate: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Expected Harvest</label>
                  <input
                    type="date"
                    value={plotForm.expectedHarvest}
                    onChange={(e) => setPlotForm({ ...plotForm, expectedHarvest: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Notes / Observations</label>
                <textarea
                  rows={2}
                  placeholder="Soil prep details, fertilizer applied..."
                  value={plotForm.notes}
                  onChange={(e) => setPlotForm({ ...plotForm, notes: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 rounded-xl shadow transition-colors text-xs"
              >
                Save Land Plot
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Harvest Stock Modal */}
      {showHarvestModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">Add Harvest Storage Stock</h3>
              <button onClick={() => setShowHarvestModal(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>

            <form onSubmit={handleHarvestSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Crop Name</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Paddy / Rice"
                    value={harvestForm.crop}
                    onChange={(e) => setHarvestForm({ ...harvestForm, crop: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Variety</label>
                  <input
                    type="text"
                    placeholder="E.g., Basmati 1121"
                    value={harvestForm.variety}
                    onChange={(e) => setHarvestForm({ ...harvestForm, variety: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    required
                    placeholder="E.g., 100"
                    value={harvestForm.quantity}
                    onChange={(e) => setHarvestForm({ ...harvestForm, quantity: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Estimated Value (₹)</label>
                  <input
                    type="number"
                    placeholder="E.g., 450000"
                    value={harvestForm.estimatedMarketValue}
                    onChange={(e) => setHarvestForm({ ...harvestForm, estimatedMarketValue: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Storage Facility</label>
                  <input
                    type="text"
                    placeholder="E.g., Silo #2 / Warehouse"
                    value={harvestForm.storageLocation}
                    onChange={(e) => setHarvestForm({ ...harvestForm, storageLocation: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Quality Grade</label>
                  <select
                    value={harvestForm.grade}
                    onChange={(e) => setHarvestForm({ ...harvestForm, grade: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="Grade A">Grade A Superior</option>
                    <option value="Grade B">Grade B Standard</option>
                    <option value="Grade C">Grade C Commercial</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 rounded-xl shadow transition-colors text-xs"
              >
                Save Harvest Stock
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default FarmInventory;
