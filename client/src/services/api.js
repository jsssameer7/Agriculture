const BASE_URL = '/api';

export const fetchWeather = async () => {
  try {
    const res = await fetch(`${BASE_URL}/weather`);
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.error('Error fetching weather:', err);
    return null;
  }
};

export const fetchMarketPrices = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.state) params.append('state', filters.state);
    if (filters.category) params.append('category', filters.category);

    const res = await fetch(`${BASE_URL}/market?${params.toString()}`);
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error('Error fetching market prices:', err);
    return [];
  }
};

export const fetchPests = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.crop) params.append('crop', filters.crop);
    if (filters.search) params.append('search', filters.search);

    const res = await fetch(`${BASE_URL}/pest?${params.toString()}`);
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error('Error fetching pest database:', err);
    return [];
  }
};

export const diagnosePest = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/pest/diagnose`, {
      method: 'POST',
      body: formData
    });
    return await res.json();
  } catch (err) {
    console.error('Error diagnosing pest:', err);
    return { success: false, message: 'Server connection error' };
  }
};

export const fetchInventory = async () => {
  try {
    const res = await fetch(`${BASE_URL}/inventory`);
    return await res.json();
  } catch (err) {
    console.error('Error fetching inventory:', err);
    return { plots: [], harvestInventory: [], summary: {} };
  }
};

export const addOrUpdatePlot = async (plotData) => {
  try {
    const res = await fetch(`${BASE_URL}/inventory/plots`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(plotData)
    });
    return await res.json();
  } catch (err) {
    console.error('Error saving plot:', err);
    return { success: false };
  }
};

export const deletePlot = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/inventory/plots/${id}`, { method: 'DELETE' });
    return await res.json();
  } catch (err) {
    console.error('Error deleting plot:', err);
    return { success: false };
  }
};

export const addOrUpdateHarvest = async (harvestData) => {
  try {
    const res = await fetch(`${BASE_URL}/inventory/harvest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(harvestData)
    });
    return await res.json();
  } catch (err) {
    console.error('Error saving harvest:', err);
    return { success: false };
  }
};

export const deleteHarvest = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/inventory/harvest/${id}`, { method: 'DELETE' });
    return await res.json();
  } catch (err) {
    console.error('Error deleting harvest item:', err);
    return { success: false };
  }
};

export const fetchExpenses = async () => {
  try {
    const res = await fetch(`${BASE_URL}/expenses`);
    return await res.json();
  } catch (err) {
    console.error('Error fetching expenses:', err);
    return { analytics: { totalIncome: 0, totalExpense: 0, netProfit: 0 }, transactions: [] };
  }
};

export const addExpense = async (txData) => {
  try {
    const res = await fetch(`${BASE_URL}/expenses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(txData)
    });
    return await res.json();
  } catch (err) {
    console.error('Error adding transaction:', err);
    return { success: false };
  }
};

export const deleteExpense = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/expenses/${id}`, { method: 'DELETE' });
    return await res.json();
  } catch (err) {
    console.error('Error deleting transaction:', err);
    return { success: false };
  }
};
