import React from 'react';
import { 
  Sprout, 
  LayoutDashboard, 
  Bug, 
  TrendingUp, 
  Layers, 
  Receipt, 
  CloudSun,
  Globe
} from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab, lang, setLang }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pest', label: 'Pest Diagnostics', icon: Bug },
    { id: 'market', label: 'Mandi Rates', icon: TrendingUp },
    { id: 'inventory', label: 'Land & Harvest', icon: Layers },
    { id: 'expenses', label: 'Expenses & Income', icon: Receipt },
    { id: 'weather', label: 'Weather Advisory', icon: CloudSun },
  ];

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'HI', name: 'हिन्दी (Hindi)' },
    { code: 'MR', name: 'मराठी (Marathi)' },
    { code: 'ES', name: 'Español' },
  ];

  return (
    <header className="bg-emerald-800 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer" 
            onClick={() => setActiveTab('dashboard')}
          >
            <div className="bg-emerald-600 p-2 rounded-xl text-white shadow-inner flex items-center justify-center">
              <Sprout className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight text-white flex items-center gap-1.5">
                Gunda Plant Platform <span className="bg-emerald-700/80 text-emerald-200 text-xs px-2 py-0.5 rounded-full font-medium border border-emerald-500/30">Krishi Mitra</span>
              </span>
              <p className="text-[11px] text-emerald-200 font-medium">Smart Farm & Harvest Management</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-emerald-900/80 text-emerald-100 shadow-sm border border-emerald-600/40'
                      : 'text-emerald-100 hover:bg-emerald-700/60 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-300' : 'text-emerald-200'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right actions: Language switcher & status */}
          <div className="flex items-center space-x-3">
            <div className="relative flex items-center bg-emerald-900/60 rounded-lg px-2.5 py-1.5 border border-emerald-700/50">
              <Globe className="w-4 h-4 text-emerald-300 mr-2" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="bg-transparent text-xs text-emerald-100 font-medium focus:outline-none cursor-pointer"
              >
                {languages.map(l => (
                  <option key={l.code} value={l.code} className="bg-emerald-900 text-white">
                    {l.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="lg:hidden flex items-center overflow-x-auto py-2 space-x-1 border-t border-emerald-700/50 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-emerald-900 text-white font-semibold'
                    : 'text-emerald-100 hover:bg-emerald-700/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
