import express from 'express';
import { initialPlots, initialHarvestInventory } from '../data/mockData.js';

const router = express.Router();

let plots = [...initialPlots];
let harvestInventory = [...initialHarvestInventory];

// GET Plots & Harvest summary
router.get('/', (req, res) => {
  const totalLandArea = plots.reduce((acc, p) => acc + (Number(p.areaAcres) || 0), 0);
  const totalHarvestValue = harvestInventory.reduce((acc, h) => acc + (Number(h.estimatedMarketValue) || 0), 0);

  res.json({
    success: true,
    summary: {
      totalPlots: plots.length,
      totalLandAreaAcres: totalLandArea,
      totalStockBatches: harvestInventory.length,
      estimatedInventoryValue: totalHarvestValue
    },
    plots,
    harvestInventory
  });
});

// POST Add or update Plot
router.post('/plots', (req, res) => {
  const { id, name, crop, areaAcres, soilType, sowingDate, expectedHarvest, stage, healthStatus, irrigationType, notes } = req.body;

  if (id) {
    const idx = plots.findIndex(p => p.id === id);
    if (idx !== -1) {
      plots[idx] = { ...plots[idx], name, crop, areaAcres, soilType, sowingDate, expectedHarvest, stage, healthStatus, irrigationType, notes };
      return res.json({ success: true, message: 'Plot updated successfully', plot: plots[idx] });
    }
  }

  const newPlot = {
    id: `plot-${Date.now()}`,
    name: name || 'New Land Plot',
    crop: crop || 'Unassigned',
    areaAcres: Number(areaAcres) || 1.0,
    soilType: soilType || 'Alluvial',
    sowingDate: sowingDate || new Date().toISOString().split('T')[0],
    expectedHarvest: expectedHarvest || '',
    stage: stage || 'Sowing',
    healthStatus: healthStatus || 'Good',
    irrigationType: irrigationType || 'Drip Irrigation',
    notes: notes || ''
  };

  plots.unshift(newPlot);
  res.status(201).json({ success: true, message: 'Plot added successfully', plot: newPlot });
});

// DELETE Plot
router.delete('/plots/:id', (req, res) => {
  plots = plots.filter(p => p.id !== req.params.id);
  res.json({ success: true, message: 'Plot deleted successfully' });
});

// POST Add or update Harvest Inventory
router.post('/harvest', (req, res) => {
  const { id, crop, variety, quantity, unit, harvestDate, storageLocation, grade, sellingStatus, estimatedMarketValue, qualityNotes } = req.body;

  if (id) {
    const idx = harvestInventory.findIndex(h => h.id === id);
    if (idx !== -1) {
      harvestInventory[idx] = { ...harvestInventory[idx], crop, variety, quantity, unit, harvestDate, storageLocation, grade, sellingStatus, estimatedMarketValue: Number(estimatedMarketValue), qualityNotes };
      return res.json({ success: true, message: 'Harvest inventory updated', item: harvestInventory[idx] });
    }
  }

  const newItem = {
    id: `inv-${Date.now()}`,
    crop: crop || 'Harvest Stock',
    variety: variety || 'Standard',
    quantity: Number(quantity) || 0,
    unit: unit || 'Quintals',
    harvestDate: harvestDate || new Date().toISOString().split('T')[0],
    storageLocation: storageLocation || 'Farm Silo',
    grade: grade || 'Grade A',
    sellingStatus: sellingStatus || 'Stored',
    estimatedMarketValue: Number(estimatedMarketValue) || 0,
    qualityNotes: qualityNotes || ''
  };

  harvestInventory.unshift(newItem);
  res.status(201).json({ success: true, message: 'Harvest batch added', item: newItem });
});

// DELETE Harvest item
router.delete('/harvest/:id', (req, res) => {
  harvestInventory = harvestInventory.filter(h => h.id !== req.params.id);
  res.json({ success: true, message: 'Harvest stock item deleted' });
});

export default router;
