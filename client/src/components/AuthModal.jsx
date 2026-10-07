import React, { useState } from 'react';
import { registerUserInSupabase, loginUserInSupabase } from '../services/supabase';

import { 
  Sprout, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  X, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Sparkles,
  Tractor,
  Wheat,
  Store,
  Bot
} from 'lucide-react';

const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [role, setRole] = useState('farmer'); // 'farmer' | 'expert' | 'trader'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' | 'phone'

  // Form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    farmLocation: 'Indore, MP'
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    if (mode === 'register') {
      const result = await registerUserInSupabase({
        name: formData.name || 'Agri User',
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: role,
        location: formData.farmLocation
      });

      if (!result.success) {
        setLoading(false);
        setErrorMessage(result.error);
        return;
      }

      setLoading(false);
      setSuccessMessage('Account Created & Saved in Supabase!');
      setTimeout(() => {
        onLoginSuccess(result.user);
        onClose();
        setSuccessMessage('');
      }, 800);

    } else {
      // Login mode
      const result = await loginUserInSupabase(formData.email, formData.password);

      if (!result.success) {
        setLoading(false);
        setErrorMessage(result.error);
        return;
      }

      setLoading(false);
      setSuccessMessage(`Welcome back, ${result.user.name}!`);
      setTimeout(() => {
        onLoginSuccess(result.user);
        onClose();
        setSuccessMessage('');
      }, 800);
    }
  };

  const handleDemoLogin = (demoRole) => {
    setRole(demoRole);
    setLoading(true);
    setErrorMessage('');
    setTimeout(() => {
      setLoading(false);
      const demoUsers = {
        farmer: { name: 'Rajesh Kumar (Farmer)', email: 'rajesh@gundaplant.com', role: 'farmer', location: 'Indore, MP' },
        expert: { name: 'Dr. Anita Sharma (Agri Expert)', email: 'anita@gundaplant.com', role: 'expert', location: 'Bhopal, MP' },
        trader: { name: 'Vikram Singh (Mandi Trader)', email: 'vikram@gundaplant.com', role: 'trader', location: 'Ujjain, MP' }
      };
      const user = demoUsers[demoRole] || demoUsers.farmer;
      setSuccessMessage(`Logged in as ${user.name}`);
      setTimeout(() => {
        onLoginSuccess(user);
        onClose();
        setSuccessMessage('');
      }, 800);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row transform transition-all scale-100 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Animated Visual Banner */}
        <div className="md:w-5/12 bg-gradient-to-br from-emerald-800 via-emerald-900 to-teal-950 p-8 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Animated Background Orbs & Floating Leaf Particles */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl animate-pulse duration-1000"></div>
          
          <div className="relative z-10 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="bg-emerald-600/90 p-2.5 rounded-2xl ring-4 ring-emerald-500/30 text-emerald-100 shadow-lg">
                <Sprout className="w-8 h-8 animate-bounce" />
              </div>
              <div>
                <h3 className="font-extrabold text-xl tracking-tight text-white">Gunda Plant</h3>
                <p className="text-xs text-emerald-300 font-medium">Smart Agriculture Platform</p>
              </div>
            </div>

            <div className="pt-4 space-y-4">
              <h2 className="text-2xl font-bold leading-tight">
                {mode === 'login' ? 'Welcome Back, Farmer Partner! 👋' : 'Join Gunda Plant Platform 🌾'}
              </h2>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                Empowering farmers with AI pest diagnosis, real-time mandi prices, weather advisories & smart harvest tracking.
              </p>
            </div>

            {/* Feature Highlights Badges */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/10 text-xs font-medium text-emerald-100 transform transition-transform hover:translate-x-1">
                <Bot className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>AI Crop Disease & Pest Scanner</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/10 text-xs font-medium text-emerald-100 transform transition-transform hover:translate-x-1">
                <Wheat className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Live APMC Mandi Commodity Rates</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/10 text-xs font-medium text-emerald-100 transform transition-transform hover:translate-x-1">
                <ShieldCheck className="w-4 h-4 text-teal-300 shrink-0" />
                <span>Verified Agricultural Expert Advisory</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-[11px] text-emerald-300">
            <span>Security Protected 🔒</span>
            <span className="flex items-center gap-1 font-semibold text-white">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Krishi Mitra v2.0
            </span>
          </div>
        </div>

        {/* Right Form Area */}
        <div className="md:w-7/12 p-8 bg-white flex flex-col justify-between">
          <div>
            {/* Mode Switcher Tabs */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
              <div className="flex space-x-2 bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => { setMode('login'); setErrorMessage(''); }}
                  className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                    mode === 'login' 
                      ? 'bg-emerald-700 text-white shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setMode('register'); setErrorMessage(''); }}
                  className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                    mode === 'register' 
                      ? 'bg-emerald-700 text-white shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Login Method Toggle */}
              <div className="flex items-center space-x-1 text-xs text-slate-500 font-medium">
                <button
                  type="button"
                  onClick={() => setLoginMethod(loginMethod === 'email' ? 'phone' : 'email')}
                  className="text-emerald-700 hover:underline flex items-center gap-1 font-semibold"
                >
                  {loginMethod === 'email' ? <Phone className="w-3.5 h-3.5" /> : <Mail className="w-3.5 h-3.5" />}
                  Use {loginMethod === 'email' ? 'Phone / OTP' : 'Email'}
                </button>
              </div>
            </div>

            {/* Select Role */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-slate-700 mb-2">Select User Role</label>
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setRole('farmer')}
                  className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                    role === 'farmer'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Tractor className="w-3.5 h-3.5 text-emerald-600" /> Farmer
                </button>

                <button
                  type="button"
                  onClick={() => setRole('expert')}
                  className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                    role === 'expert'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600" /> Agri Expert
                </button>

                <button
                  type="button"
                  onClick={() => setRole('trader')}
                  className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                    role === 'trader'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Store className="w-3.5 h-3.5 text-amber-600" /> Mandi Trader
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. basava"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>
              )}

              {loginMethod === 'email' ? (
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="farmer@gundaplant.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Mobile Number (WhatsApp/SMS)</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-9 pr-10 py-2.5 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error Alert Banner */}
              {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Success Message Banner */}
              {successMessage && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-bounce">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 text-xs disabled:opacity-70"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>{mode === 'login' ? 'Sign In to Dashboard' : 'Register Account'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Instant Demo Login Buttons */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              ⚡ Quick Demo Login
            </span>
            <div className="flex justify-center gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('farmer')}
                className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-semibold transition-colors border border-emerald-200/60"
              >
                👨‍🌾 Demo Farmer
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('expert')}
                className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded-lg text-xs font-semibold transition-colors border border-teal-200/60"
              >
                👨‍🔬 Demo Expert
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('trader')}
                className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-lg text-xs font-semibold transition-colors border border-amber-200/60"
              >
                🏬 Demo Trader
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
