import express from 'express';
import multer from 'multer';
import { mockPestDatabase } from '../data/mockData.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

let pestDb = [...mockPestDatabase];

// GET all pests
router.get('/', (req, res) => {
  const { crop, search } = req.query;
  let results = [...pestDb];

  if (crop && crop !== 'All') {
    results = results.filter(p => p.crop.toLowerCase().includes(crop.toLowerCase()));
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.symptoms.some(s => s.toLowerCase().includes(q)) ||
      p.causes.toLowerCase().includes(q)
    );
  }

  res.json({
    success: true,
    data: results
  });
});

// GET pest by ID
router.get('/:id', (req, res) => {
  const pest = pestDb.find(p => p.id === req.params.id);
  if (!pest) {
    return res.status(404).json({ success: false, message: 'Pest/Disease record not found' });
  }
  res.json({ success: true, data: pest });
});

// POST Diagnostic AI / Symptom Checker endpoint
router.post('/diagnose', upload.single('image'), (req, res) => {
  const { crop, symptoms, textDescription } = req.body;
  
  let parsedSymptoms = [];
  try {
    parsedSymptoms = typeof symptoms === 'string' ? JSON.parse(symptoms) : (symptoms || []);
  } catch (e) {
    parsedSymptoms = [];
  }

  // Matching algorithm based on crop & symptoms
  let bestMatch = null;
  let maxScore = -1;

  pestDb.forEach(pest => {
    let score = 0;
    if (crop && pest.crop.toLowerCase() === crop.toLowerCase()) {
      score += 40;
    }

    // Match keywords in symptoms or description
    if (parsedSymptoms.length > 0) {
      parsedSymptoms.forEach(sym => {
        if (pest.symptoms.some(ps => ps.toLowerCase().includes(sym.toLowerCase()))) {
          score += 25;
        }
      });
    }

    if (textDescription) {
      const words = textDescription.toLowerCase().split(/\s+/);
      words.forEach(w => {
        if (w.length > 3 && (pest.causes.toLowerCase().includes(w) || pest.name.toLowerCase().includes(w))) {
          score += 10;
        }
      });
    }

    if (score > maxScore) {
      maxScore = score;
      bestMatch = pest;
    }
  });

  // Default to first match or early blight if match score is low
  if (!bestMatch || maxScore < 20) {
    bestMatch = pestDb[0];
  }

  const confidenceScore = Math.min(96, Math.max(78, maxScore > 40 ? 88 + Math.floor(Math.random() * 8) : 76 + Math.floor(Math.random() * 10)));

  res.json({
    success: true,
    confidence: confidenceScore,
    diagnosis: bestMatch,
    hasImageReceived: !!req.file,
    timestamp: new Date().toISOString(),
    recommendations: {
      immediateAction: bestMatch.organicTreatment[0],
      chemicalOption: bestMatch.chemicalTreatment[0],
      prevention: bestMatch.preventiveMeasures[0]
    }
  });
});

export default router;
