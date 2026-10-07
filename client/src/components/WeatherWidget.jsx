import React from 'react';
import { 
  CloudSun, 
  Sun, 
  CloudRain, 
  CloudLightning, 
  Wind, 
  Droplets, 
  Thermometer, 
  AlertCircle, 
  CheckCircle2, 
  ShieldAlert,
  Compass
} from 'lucide-react';

const WeatherWidget = ({ weather }) => {
  const {
    location = "Green Valley Farms, District Indore",
    temperature = 28,
    condition = "Partly Cloudy",
    humidity = 64,
    windSpeed = 14,
    rainProbability = 25,
    uvIndex = 6,
    soilMoisture = "Good (68%)",
    advisory = [],
    forecast = []
  } = weather || {};

  const getWeatherIcon = (iconName) => {
    switch (iconName) {
      case 'sun': return <Sun className="w-6 h-6 text-amber-500" />;
      case 'cloud-rain': return <CloudRain className="w-6 h-6 text-blue-500" />;
      case 'cloud-lightning': return <CloudLightning className="w-6 h-6 text-purple-600" />;
      default: return <CloudSun className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <CloudSun className="w-6 h-6 text-sky-500" />
            Field Weather Station & Smart Irrigation Advisory
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time microclimate monitoring and actionable field spraying advisories.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
          <Compass className="w-3.5 h-3.5 text-slate-500" />
          <span>{location}</span>
        </div>
      </div>

      {/* Hero Weather Card */}
      <div className="bg-gradient-to-br from-sky-600 via-sky-700 to-indigo-800 rounded-2xl p-6 text-white shadow-lg grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Main Temperature & Condition */}
        <div className="md:col-span-5 space-y-2">
          <span className="text-xs font-semibold text-sky-200 uppercase tracking-wider">Live Conditions</span>
          <div className="flex items-center gap-4">
            <CloudSun className="w-16 h-16 text-amber-300" />
            <div>
              <div className="text-5xl font-black">{temperature}°C</div>
              <p className="text-sm font-medium text-sky-100">{condition}</p>
            </div>
          </div>
          <p className="text-xs text-sky-200 pt-1">
            Soil Moisture Status: <span className="font-bold text-white">{soilMoisture}</span>
          </p>
        </div>

        {/* Microclimate Metrics */}
        <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/15">
          <div className="text-center p-2">
            <Droplets className="w-5 h-5 text-sky-300 mx-auto mb-1" />
            <span className="text-[11px] text-sky-200 block">Humidity</span>
            <span className="text-base font-bold">{humidity}%</span>
          </div>

          <div className="text-center p-2">
            <Wind className="w-5 h-5 text-sky-300 mx-auto mb-1" />
            <span className="text-[11px] text-sky-200 block">Wind Speed</span>
            <span className="text-base font-bold">{windSpeed} km/h</span>
          </div>

          <div className="text-center p-2">
            <CloudRain className="w-5 h-5 text-sky-300 mx-auto mb-1" />
            <span className="text-[11px] text-sky-200 block">Rain Chance</span>
            <span className="text-base font-bold">{rainProbability}%</span>
          </div>

          <div className="text-center p-2">
            <Sun className="w-5 h-5 text-amber-300 mx-auto mb-1" />
            <span className="text-[11px] text-sky-200 block">UV Index</span>
            <span className="text-base font-bold">{uvIndex} / 10</span>
          </div>
        </div>

      </div>

      {/* Field Advisories */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-emerald-600" />
          Smart Agricultural Action Alerts
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {advisory.map((adv, idx) => (
            <div 
              key={idx} 
              className={`p-4 rounded-2xl border flex items-start gap-3 ${
                adv.type === 'warning' ? 'bg-amber-50/80 border-amber-200 text-amber-900' :
                adv.type === 'success' ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900' :
                'bg-sky-50/80 border-sky-200 text-sky-900'
              }`}
            >
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs">{adv.title}</h4>
                <p className="text-xs mt-1 leading-relaxed opacity-90">{adv.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5-Day Forecast Grid */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900">5-Day Meteorological Forecast</h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {forecast.map((day, idx) => (
            <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200/70 text-center space-y-2">
              <span className="text-xs font-bold text-slate-700 block">{day.day}</span>
              <div className="flex justify-center py-1">{getWeatherIcon(day.icon)}</div>
              <div className="text-sm font-bold text-slate-900">{day.tempMax}° / <span className="text-slate-500 font-medium">{day.tempMin}°</span></div>
              <span className="text-[11px] text-sky-700 font-semibold block">{day.rainProb}% Rain</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default WeatherWidget;
