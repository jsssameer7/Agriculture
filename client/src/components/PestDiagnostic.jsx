import React, { useState } from 'react';
import { 
  Bug, 
  Upload, 
  Search, 
  CheckCircle, 
  AlertOctagon, 
  Leaf, 
  FlaskConical, 
  ShieldCheck, 
  Camera, 
  RefreshCw,
  Printer,
  Sparkles,
  Info
} from 'lucide-react';
import { diagnosePest } from '../services/api';

const PestDiagnostic = ({ pestDatabase }) => {
  const [selectedCrop, setSelectedCrop] = useState('Tomato');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [textDescription, setTextDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState(null);

  // Search & browse tab state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubTab, setActiveSubTab] = useState('scanner'); // 'scanner' | 'library'
  const [selectedPestDetail, setSelectedPestDetail] = useState(null);

  const availableCrops = ['Tomato', 'Wheat', 'Cotton', 'Rice / Paddy', 'Maize', 'Soybean', 'Potato'];

  const commonSymptomList = [
    "Concentric ring spots on leaves",
    "Orange-brown pustules on stems/leaves",
    "Leaf curling & sticky honeydew",
    "Spindle-shaped white-center spots",
    "Sawdust-like frass inside leaf whorl",
    "Yellowing & premature leaf drop",
    "Stunted plant growth",
    "Sunken dark fruit spots"
  ];

  const handleSymptomToggle = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const runDiagnosis = async () => {
    setIsScanning(true);
    setDiagnosisResult(null);

    const formData = new FormData();
    formData.append('crop', selectedCrop);
    formData.append('symptoms', JSON.stringify(selectedSymptoms));
    formData.append('textDescription', textDescription);
    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    // Simulate scanning delay for realistic feel
    setTimeout(async () => {
      const res = await diagnosePest(formData);
      setIsScanning(false);
      if (res && res.success) {
        setDiagnosisResult(res);
      }
    }, 1500);
  };

  const filteredPests = pestDatabase.filter(pest => {
    const matchesCrop = selectedCrop === 'All' || pest.crop.toLowerCase().includes(selectedCrop.toLowerCase());
    const matchesSearch = !searchQuery || 
      pest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      pest.symptoms.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCrop && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Bug className="w-6 h-6 text-amber-500" />
            Crop Pest & Disease AI Diagnostic Center
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Identify crop infections, insect pests, and nutrient deficiencies. Receive bio-organic & chemical treatment guidelines.
          </p>
        </div>

        {/* Sub-tab switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveSubTab('scanner')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'scanner'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            AI Symptom Scanner
          </button>
          <button
            onClick={() => setActiveSubTab('library')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'library'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            Disease Knowledge Library
          </button>
        </div>
      </div>

      {activeSubTab === 'scanner' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Diagnostic Form Inputs */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-5">
              
              {/* Step 1: Crop Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  1. Select Target Crop
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {availableCrops.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setSelectedCrop(c)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border text-center transition-all ${
                        selectedCrop === c
                          ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm font-semibold'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Photo Uploader */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  2. Crop Foliage Photo (Optional)
                </label>
                <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-4 text-center bg-slate-50/50 transition-colors">
                  {imagePreview ? (
                    <div className="relative inline-block">
                      <img 
                        src={imagePreview} 
                        alt="Crop preview" 
                        className="max-h-40 rounded-xl object-cover border border-slate-300 shadow-sm" 
                      />
                      <button
                        onClick={() => { setSelectedImage(null); setImagePreview(null); }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs shadow"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center py-4">
                      <Camera className="w-8 h-8 text-slate-400 mb-2" />
                      <span className="text-xs font-medium text-slate-700">Click to upload plant photo or drag & drop</span>
                      <span className="text-[11px] text-slate-400 mt-0.5">Supports PNG, JPG, JPEG</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                        className="hidden" 
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Step 3: Observed Symptoms */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  3. Select Observed Symptoms
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {commonSymptomList.map((sym) => {
                    const isChecked = selectedSymptoms.includes(sym);
                    return (
                      <div
                        key={sym}
                        onClick={() => handleSymptomToggle(sym)}
                        className={`p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-all flex items-start gap-2 ${
                          isChecked
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <input 
                          type="checkbox" 
                          checked={isChecked} 
                          onChange={() => {}} 
                          className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500" 
                        />
                        <span>{sym}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Additional Notes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  4. Additional Observations / Notes
                </label>
                <textarea
                  value={textDescription}
                  onChange={(e) => setTextDescription(e.target.value)}
                  placeholder="E.g., Yellow leaves started appearing after heavy rainfall 3 days ago..."
                  rows={2}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* Run Diagnosis Button */}
              <button
                onClick={runDiagnosis}
                disabled={isScanning}
                className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                    Analyzing Plant Symptoms...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    Generate AI Diagnostic Report
                  </>
                )}
              </button>

            </div>
          </div>

          {/* Diagnostic Results Column */}
          <div className="lg:col-span-6 space-y-5">
            {isScanning && (
              <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center space-y-4">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <Bug className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-bold text-slate-800 text-lg">Processing Symptom Matching Engine</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Cross-referencing fungal spores, insect vector behavior, and pathology database for {selectedCrop}...
                </p>
              </div>
            )}

            {!isScanning && !diagnosisResult && (
              <div className="bg-white rounded-2xl p-10 border border-slate-200 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="font-bold text-slate-800 text-base">Ready for Plant Scan</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Select your crop and symptoms on the left panel, then click "Generate AI Diagnostic Report".
                </p>
              </div>
            )}

            {!isScanning && diagnosisResult && diagnosisResult.diagnosis && (
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-md space-y-6 print:p-0 print:shadow-none">
                
                {/* Result Header */}
                <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 mb-2">
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      AI Match Confidence: {diagnosisResult.confidence}%
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900">
                      {diagnosisResult.diagnosis.name}
                    </h3>
                    <p className="text-xs font-mono italic text-slate-500">
                      Scientific Name: {diagnosisResult.diagnosis.scientificName} &bull; {diagnosisResult.diagnosis.category}
                    </p>
                  </div>

                  <span className={`px-3 py-1 rounded-xl text-xs font-bold ${
                    diagnosisResult.diagnosis.severity.includes('High') || diagnosisResult.diagnosis.severity.includes('Critical')
                      ? 'bg-red-100 text-red-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    Severity: {diagnosisResult.diagnosis.severity}
                  </span>
                </div>

                {/* Causes & Trigger */}
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/60 text-xs">
                  <span className="font-bold text-slate-800 block mb-1">Causes & Trigger Conditions:</span>
                  <p className="text-slate-600">{diagnosisResult.diagnosis.causes}</p>
                </div>

                {/* Treatment Plans: Organic vs Chemical */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Organic Treatment */}
                  <div className="bg-emerald-50/70 rounded-xl p-4 border border-emerald-200/60 space-y-2">
                    <h4 className="font-bold text-emerald-900 text-xs flex items-center gap-1.5 uppercase">
                      <Leaf className="w-4 h-4 text-emerald-700" />
                      Organic & Bio Treatment
                    </h4>
                    <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                      {diagnosisResult.diagnosis.organicTreatment.map((item, idx) => (
                        <li key={idx} className="leading-tight">{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Chemical Treatment */}
                  <div className="bg-amber-50/70 rounded-xl p-4 border border-amber-200/60 space-y-2">
                    <h4 className="font-bold text-amber-900 text-xs flex items-center gap-1.5 uppercase">
                      <FlaskConical className="w-4 h-4 text-amber-700" />
                      Chemical Fungicide / Pesticide
                    </h4>
                    <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                      {diagnosisResult.diagnosis.chemicalTreatment.map((item, idx) => (
                        <li key={idx} className="leading-tight">{item}</li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Preventive Protocol */}
                <div className="bg-sky-50/70 rounded-xl p-4 border border-sky-200/60 space-y-2">
                  <h4 className="font-bold text-sky-900 text-xs flex items-center gap-1.5 uppercase">
                    <ShieldCheck className="w-4 h-4 text-sky-700" />
                    Long-term Prevention Protocol
                  </h4>
                  <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                    {diagnosisResult.diagnosis.preventiveMeasures.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Print button */}
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 px-3 py-1.5 rounded-lg bg-slate-50"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    Print Care Sheet
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>
      )}

      {/* Disease Knowledge Library Tab */}
      {activeSubTab === 'library' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-6">
          
          {/* Search bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search pests or symptoms..."
                className="w-full text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              {['All', 'Tomato', 'Wheat', 'Cotton', 'Rice', 'Maize'].map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCrop(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border whitespace-nowrap ${
                    selectedCrop === c
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Pest Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPests.map((pest) => (
              <div 
                key={pest.id} 
                className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="h-44 overflow-hidden relative">
                  <img 
                    src={pest.imageUrl} 
                    alt={pest.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                  />
                  <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {pest.crop}
                  </span>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">{pest.name}</h4>
                    <p className="text-[11px] italic text-slate-500 font-mono">{pest.scientificName}</p>
                    
                    <div className="mt-3 space-y-1">
                      <span className="text-[11px] font-bold text-slate-700 block">Key Symptoms:</span>
                      <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                        {pest.symptoms.slice(0, 2).map((sym, i) => (
                          <li key={i} className="truncate">{sym}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-800">
                      {pest.organicTreatment.length} Bio Treatments
                    </span>
                    <button
                      onClick={() => {
                        setSelectedCrop(pest.crop);
                        setActiveSubTab('scanner');
                      }}
                      className="text-xs font-bold text-slate-800 hover:text-emerald-700 flex items-center gap-1"
                    >
                      Diagnose Crop
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};

export default PestDiagnostic;
