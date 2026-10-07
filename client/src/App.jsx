import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import PestDiagnostic from './components/PestDiagnostic';
import MarketPrices from './components/MarketPrices';
import FarmInventory from './components/FarmInventory';
import ExpenseTracker from './components/ExpenseTracker';
import WeatherWidget from './components/WeatherWidget';
import AuthModal from './components/AuthModal';

import { 
  fetchWeather, 
  fetchMarketPrices, 
  fetchPests, 
  fetchInventory, 
  fetchExpenses 
} from './services/api';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [lang, setLang] = useState('EN');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Global Data State
  const [weatherData, setWeatherData] = useState(null);
  const [marketPrices, setMarketPrices] = useState([]);
  const [pestDatabase, setPestDatabase] = useState([]);
  const [inventoryData, setInventoryData] = useState({ plots: [], harvestInventory: [], summary: {} });
  const [expenseData, setExpenseData] = useState({ analytics: {}, transactions: [] });
  const [loading, setLoading] = useState(true);

  // Restore user session from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('gunda_plant_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse user session:', e);
      }
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('gunda_plant_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('gunda_plant_user');
  };

  const loadAllData = async () => {
    setLoading(true);
    const [w, m, p, inv, exp] = await Promise.all([
      fetchWeather(),
      fetchMarketPrices(),
      fetchPests(),
      fetchInventory(),
      fetchExpenses()
    ]);

    if (w) setWeatherData(w);
    if (m) setMarketPrices(m);
    if (p) setPestDatabase(p);
    if (inv) setInventoryData(inv);
    if (exp) setExpenseData(exp);
    setLoading(false);
  };

  useEffect(() => {
    loadAllData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        lang={lang} 
        setLang={setLang}
        user={user}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <Dashboard 
            setActiveTab={setActiveTab}
            weather={weatherData}
            marketPrices={marketPrices}
            inventoryData={inventoryData}
            expenseData={expenseData}
            user={user}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
          />
        )}

        {activeTab === 'pest' && (
          <PestDiagnostic 
            pestDatabase={pestDatabase}
          />
        )}

        {activeTab === 'market' && (
          <MarketPrices 
            marketPrices={marketPrices}
          />
        )}

        {activeTab === 'inventory' && (
          <FarmInventory 
            inventoryData={inventoryData}
            onRefresh={loadAllData}
          />
        )}

        {activeTab === 'expenses' && (
          <ExpenseTracker 
            expenseData={expenseData}
            onRefresh={loadAllData}
          />
        )}

        {activeTab === 'weather' && (
          <WeatherWidget 
            weather={weatherData}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>🌾 <strong>Gunda Plant Platform (Krishi Mitra)</strong> - Empowering Farmers with AI & Real-time Market Intelligence</span>
          <span>Version 2.0 &bull; Built with React & Express</span>
        </div>
      </footer>

      {/* User Auth Login/Register Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default App;
