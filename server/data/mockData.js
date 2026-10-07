export const mockWeather = {
  location: "Green Valley Farms, District Indore",
  temperature: 28,
  condition: "Partly Cloudy",
  humidity: 64,
  windSpeed: 14,
  rainProbability: 25,
  uvIndex: 6,
  soilMoisture: "Good (68%)",
  advisory: [
    { title: "Irrigation Alert", text: "Optimal soil moisture levels detected. Hold off irrigation for 24 hours.", type: "info" },
    { title: "Spraying Advisory", text: "Wind speed is under 15 km/h. Ideal conditions for pesticide application until 4 PM.", type: "success" },
    { title: "Fungi Watch", text: "Humidity above 60% with warm weather may trigger Wheat Leaf Rust. Inspect leaves today.", type: "warning" }
  ],
  forecast: [
    { day: "Today", tempMax: 30, tempMin: 21, condition: "Partly Cloudy", rainProb: 20, icon: "cloud-sun" },
    { day: "Tomorrow", tempMax: 29, tempMin: 20, condition: "Light Rain", rainProb: 65, icon: "cloud-rain" },
    { day: "Thu", tempMax: 31, tempMin: 22, condition: "Sunny", rainProb: 10, icon: "sun" },
    { day: "Fri", tempMax: 32, tempMin: 23, condition: "Sunny", rainProb: 5, icon: "sun" },
    { day: "Sat", tempMax: 28, tempMin: 19, condition: "Thunderstorm", rainProb: 80, icon: "cloud-lightning" }
  ]
};

export const mockMarketPrices = [
  {
    id: "m-1",
    crop: "Wheat (Lok-1)",
    category: "Cereals",
    mandi: "Indore APMC",
    state: "Madhya Pradesh",
    district: "Indore",
    minPrice: 2350,
    maxPrice: 2680,
    modalPrice: 2540,
    unit: "Quintal",
    change: +45,
    trend: "up",
    lastUpdated: "2026-10-07",
    history: [2480, 2490, 2500, 2515, 2520, 2530, 2540]
  },
  {
    id: "m-2",
    crop: "Paddy / Rice (Basmati 1121)",
    category: "Cereals",
    mandi: "Karnal Mandi",
    state: "Haryana",
    district: "Karnal",
    minPrice: 4100,
    maxPrice: 4600,
    modalPrice: 4450,
    unit: "Quintal",
    change: +120,
    trend: "up",
    lastUpdated: "2026-10-07",
    history: [4300, 4320, 4380, 4400, 4420, 4430, 4450]
  },
  {
    id: "m-3",
    crop: "Cotton (Medium Staple)",
    category: "Cash Crops",
    mandi: "Rajkot APMC",
    state: "Gujarat",
    district: "Rajkot",
    minPrice: 7100,
    maxPrice: 7650,
    modalPrice: 7400,
    unit: "Quintal",
    change: -80,
    trend: "down",
    lastUpdated: "2026-10-07",
    history: [7520, 7500, 7480, 7460, 7440, 7420, 7400]
  },
  {
    id: "m-4",
    crop: "Soybean (Yellow)",
    category: "Oilseeds",
    mandi: "Ujjain Mandi",
    state: "Madhya Pradesh",
    district: "Ujjain",
    minPrice: 4600,
    maxPrice: 5100,
    modalPrice: 4890,
    unit: "Quintal",
    change: +15,
    trend: "up",
    lastUpdated: "2026-10-07",
    history: [4800, 4820, 4830, 4850, 4860, 4875, 4890]
  },
  {
    id: "m-5",
    crop: "Tomato (Hybrid)",
    category: "Vegetables",
    mandi: "Kolar Market",
    state: "Karnataka",
    district: "Kolar",
    minPrice: 1800,
    maxPrice: 2400,
    modalPrice: 2150,
    unit: "Quintal",
    change: +210,
    trend: "up",
    lastUpdated: "2026-10-07",
    history: [1800, 1850, 1920, 2000, 2050, 2100, 2150]
  },
  {
    id: "m-6",
    crop: "Potato (Jyoti)",
    category: "Vegetables",
    mandi: "Agra Mandi",
    state: "Uttar Pradesh",
    district: "Agra",
    minPrice: 1350,
    maxPrice: 1650,
    modalPrice: 1520,
    unit: "Quintal",
    change: -30,
    trend: "down",
    lastUpdated: "2026-10-07",
    history: [1580, 1570, 1560, 1550, 1540, 1530, 1520]
  },
  {
    id: "m-7",
    crop: "Onion (Red)",
    category: "Vegetables",
    mandi: "Lasalgaon Mandi",
    state: "Maharashtra",
    district: "Nashik",
    minPrice: 2200,
    maxPrice: 2900,
    modalPrice: 2600,
    unit: "Quintal",
    change: +50,
    trend: "up",
    lastUpdated: "2026-10-07",
    history: [2500, 2520, 2540, 2550, 2570, 2580, 2600]
  },
  {
    id: "m-8",
    crop: "Maize / Corn",
    category: "Cereals",
    mandi: "Davangere Market",
    state: "Karnataka",
    district: "Davangere",
    minPrice: 2050,
    maxPrice: 2300,
    modalPrice: 2180,
    unit: "Quintal",
    change: 0,
    trend: "stable",
    lastUpdated: "2026-10-07",
    history: [2180, 2180, 2180, 2180, 2180, 2180, 2180]
  }
];

export const mockPestDatabase = [
  {
    id: "p-1",
    name: "Tomato Early Blight",
    crop: "Tomato",
    scientificName: "Alternaria solani",
    category: "Fungal Disease",
    severity: "Moderate to High",
    symptoms: [
      "Concentric ring spots (bullseye pattern) on mature leaves",
      "Yellowing surrounding leaf spots",
      "Premature leaf drop starting from lower canopy",
      "Sunken dark spots near stem end of fruit"
    ],
    causes: "Warm humid weather (24-29°C), splashing rain, and poor air circulation.",
    organicTreatment: [
      "Apply copper fungicide or Neem oil spray (5ml per liter of water) every 7-10 days.",
      "Spray Trichoderma viride or Bacillus subtilis bio-fungicide solution.",
      "Prune bottom infected leaves and clear fallen debris."
    ],
    chemicalTreatment: [
      "Mancozeb 75% WP @ 2.5g/L water",
      "Chlorothalonil 75% WP @ 2g/L water",
      "Azoxystrobin 23% SC @ 1ml/L water"
    ],
    preventiveMeasures: [
      "Rotate crops with non-solanaceous plants every 2-3 years.",
      "Mulch soil around plants to prevent fungal spores from splashing up.",
      "Maintain adequate plant spacing for foliage ventilation."
    ],
    imageUrl: "https://images.unsplash.com/photo-1592417817098-8f3d6ef23a2f?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "p-2",
    name: "Wheat Brown Rust (Leaf Rust)",
    crop: "Wheat",
    scientificName: "Puccinia triticina",
    category: "Fungal Disease",
    severity: "High",
    symptoms: [
      "Small round orange-brown pustules scattered randomly on leaf surfaces",
      "Black pustules appear as crop matures",
      "Leaves turn yellow and dry prematurely",
      "Shriveled grain development"
    ],
    causes: "High relative humidity (>80%) and temperatures between 15-22°C.",
    organicTreatment: [
      "Spray fermented sour buttermilk solution (1 liter in 10 liters water).",
      "Apply Pseudomonas fluorescens bio-agent @ 10g/liter."
    ],
    chemicalTreatment: [
      "Propiconazole 25% EC @ 1ml/L water at first sign of rust",
      "Tebuconazole 25.9% EC @ 1.5ml/L water"
    ],
    preventiveMeasures: [
      "Sow rust-resistant varieties like DBW 187, HD 3226, or PBW 725.",
      "Avoid excessive nitrogen fertilization."
    ],
    imageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "p-3",
    name: "Cotton Aphids & Whitefly",
    crop: "Cotton",
    scientificName: "Aphis gossypii & Bemisia tabaci",
    category: "Insect Pest",
    severity: "High",
    symptoms: [
      "Curling and cupping of upper young leaves",
      "Sticky honeydew substance on foliage followed by black sooty mold",
      "Stunted crop growth and premature boll dropping",
      "Transmission of Leaf Curl Virus"
    ],
    causes: "Dry spells with hot weather followed by high nitrogen usage.",
    organicTreatment: [
      "Spray 5% Neem Seed Kernel Extract (NSKE) or Cold-pressed Neem oil @ 5ml/L.",
      "Release Ladybird beetles or Chrysoperla predators in the field.",
      "Install Yellow Sticky Traps @ 15-20 traps per acre."
    ],
    chemicalTreatment: [
      "Imidacloprid 17.8% SL @ 0.5ml/L water",
      "Acetamiprid 20% SP @ 0.2g/L water",
      "Diafenthiuron 50% WP @ 1g/L water"
    ],
    preventiveMeasures: [
      "Avoid excess urea / nitrogen fertilizer.",
      "Grow barrier crops like Maize or Sorghum around cotton fields."
    ],
    imageUrl: "https://images.unsplash.com/photo-1600335891808-7243c2c10b14?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "p-4",
    name: "Rice Blast Disease",
    crop: "Rice / Paddy",
    scientificName: "Magnaporthe oryzae",
    category: "Fungal Disease",
    severity: "Critical",
    symptoms: [
      "Spindle-shaped or eye-shaped spots with gray/white centers and reddish-brown margins on leaves",
      "Neck blast causing blackening and rot at the base of panicle",
      "Empty or partially filled chaffy grains"
    ],
    causes: "Night temperatures below 20°C, continuous rainy/cloudy days, high nitrogen application.",
    organicTreatment: [
      "Spray Pseudomonas fluorescens (10g/L) during tillering and panicle initiation.",
      "Apply raw cow manure slurry spray."
    ],
    chemicalTreatment: [
      "Tricyclazole 75% WP @ 0.6g/L water",
      "Isoprothiolane 40% EC @ 1.5ml/L water",
      "Kasugamycin 3% SL @ 2ml/L water"
    ],
    preventiveMeasures: [
      "Seed treatment with Carbendazim @ 2g/kg seed before sowing.",
      "Maintain recommended plant density and balanced NPK ratio."
    ],
    imageUrl: "https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "p-5",
    name: "Fall Armyworm",
    crop: "Maize",
    scientificName: "Spodoptera frugiperda",
    category: "Insect Pest",
    severity: "Critical",
    symptoms: [
      "Large ragged shot-holes in whorl leaves",
      "Sawdust-like frass (excreta) inside the central leaf whorl",
      "Larvae with inverted Y mark on head and 4 dark spots in square pattern on tail end"
    ],
    causes: "Continuous maize cropping and warm humid conditions favoring moth migration.",
    organicTreatment: [
      "Apply Bacillus thuringiensis (Bt) spray @ 2g/L or Metarhizium anisopliae.",
      "Drop dry sand mixed with neem cake into central leaf whorls.",
      "Install Pheromone traps @ 5 traps per acre for moth monitoring."
    ],
    chemicalTreatment: [
      "Emamectin Benzoate 5% SG @ 0.4g/L water",
      "Chlorantraniliprole 18.5% SC @ 0.4ml/L water",
      "Spinetoram 11.7% SC @ 0.5ml/L water"
    ],
    preventiveMeasures: [
      "Deep plowing in summer to expose pupae to birds and solar heat.",
      "Intercrop maize with cowpea or Desmodium."
    ],
    imageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop&q=80"
  }
];

export const initialPlots = [
  {
    id: "plot-101",
    name: "North Acre Field",
    crop: "Wheat (Lok-1)",
    areaAcres: 4.5,
    soilType: "Black Cotton Soil",
    sowingDate: "2026-04-15",
    expectedHarvest: "2026-11-20",
    stage: "Grain Formation",
    healthStatus: "Excellent",
    irrigationType: "Drip Irrigation",
    notes: "Applied organic vermicompost in August. Soil moisture levels monitored daily."
  },
  {
    id: "plot-102",
    name: "Riverbed Plot",
    crop: "Tomato (Hybrid)",
    areaAcres: 2.0,
    soilType: "Alluvial Loam",
    sowingDate: "2026-07-01",
    expectedHarvest: "2026-10-25",
    stage: "Fruiting / Harvesting",
    healthStatus: "Attention Needed",
    irrigationType: "Sprinkler System",
    notes: "Minor early blight noticed on lower leaves; neem oil spray initiated."
  },
  {
    id: "plot-103",
    name: "East Slope Parcel",
    crop: "Soybean",
    areaAcres: 3.2,
    soilType: "Red Clay Loam",
    sowingDate: "2026-06-10",
    expectedHarvest: "2026-10-15",
    stage: "Pre-Harvest",
    healthStatus: "Good",
    irrigationType: "Rainfed / Canal",
    notes: "Ready for harvesting in 1-2 weeks. Pod filling complete."
  }
];

export const initialHarvestInventory = [
  {
    id: "inv-201",
    crop: "Paddy / Rice (Basmati)",
    variety: "Basmati 1121",
    quantity: 145,
    unit: "Quintals",
    harvestDate: "2026-09-20",
    storageLocation: "Central Storage Silo #2",
    grade: "Grade A Superior",
    sellingStatus: "Stored",
    estimatedMarketValue: 645250,
    qualityNotes: "Moisture content 12.5%, clean grain with no discolored seeds."
  },
  {
    id: "inv-202",
    crop: "Soybean",
    variety: "JS 335",
    quantity: 60,
    unit: "Quintals",
    harvestDate: "2026-09-28",
    storageLocation: "On-Farm Warehouse",
    grade: "Grade A",
    sellingStatus: "Partially Sold (20 Qtl Sold)",
    estimatedMarketValue: 293400,
    qualityNotes: "High oil content, properly dried under sun shade."
  },
  {
    id: "inv-203",
    crop: "Cotton",
    variety: "Bt Cotton II",
    quantity: 35,
    unit: "Quintals",
    harvestDate: "2026-10-02",
    storageLocation: "District Cold & Dry Storage",
    grade: "Grade B+",
    sellingStatus: "Ready for Auction",
    estimatedMarketValue: 259000,
    qualityNotes: "Staple length 29.5mm, clean white cotton lint."
  }
];

export const initialExpenses = [
  {
    id: "exp-301",
    type: "Expense",
    category: "Seeds & Saplings",
    description: "Certified High-Yield Wheat Lok-1 Seeds (200 kg)",
    amount: 14500,
    date: "2026-04-10",
    plotId: "plot-101",
    paymentMode: "Bank Transfer / UPI"
  },
  {
    id: "exp-302",
    type: "Expense",
    category: "Fertilizers & Soil",
    description: "DAP Fertilizer (10 bags) & Organic Potash",
    amount: 22800,
    date: "2026-04-18",
    plotId: "plot-101",
    paymentMode: "Cash"
  },
  {
    id: "exp-303",
    type: "Expense",
    category: "Labor & Sowing",
    description: "Farm labor wages for seed sowing and ridge preparation",
    amount: 18000,
    date: "2026-04-20",
    plotId: "plot-101",
    paymentMode: "Cash"
  },
  {
    id: "exp-304",
    type: "Expense",
    category: "Pesticides & Crop Protection",
    description: "Organic Neem Oil spray & Trichoderma bio-agent",
    amount: 6500,
    date: "2026-07-15",
    plotId: "plot-102",
    paymentMode: "UPI"
  },
  {
    id: "exp-305",
    type: "Expense",
    category: "Equipment & Diesel",
    description: "Tractor fuel & drip irrigation maintenance",
    amount: 12400,
    date: "2026-08-05",
    plotId: "plot-103",
    paymentMode: "UPI"
  },
  {
    id: "inc-401",
    type: "Income",
    category: "Crop Sale",
    description: "Sold 20 Quintals Soybean at Mandi @ Rs 4,850/Qtl",
    amount: 97000,
    date: "2026-10-01",
    plotId: "plot-103",
    paymentMode: "Direct Bank Deposit"
  },
  {
    id: "inc-402",
    type: "Income",
    category: "Government Subsidy",
    description: "Drip Irrigation Tech Scheme Subsidy Credit",
    amount: 35000,
    date: "2026-09-12",
    plotId: "plot-101",
    paymentMode: "Direct Benefit Transfer"
  }
];
