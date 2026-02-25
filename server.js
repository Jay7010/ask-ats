require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { extractTextFromFile } = require('./services/parser.service');
const { calculateATSScore } = require('./services/ats.service');

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// Multer: store file in memory (no disk writes)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowed = ['.pdf', '.doc', '.docx'];
    const ext = '.' + file.originalname.split('.').pop().toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and DOCX files are supported'));
    }
  },
});

// ── Routes ────────────────────────────────────────────────

/**
 * Health check
 */
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'ATS Scorer API is running' });
});

/**
 * POST /api/score
 * Upload resume file and get ATS score
 */
app.post('/api/score', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded. Please upload a PDF or DOCX file.' });
    }

    console.log(`📄 Processing: ${req.file.originalname} (${(req.file.size / 1024).toFixed(1)}KB)`);

    // Extract text from file
    const resumeText = await extractTextFromFile(req.file.buffer, req.file.originalname);

    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(400).json({
        error: 'Could not extract text from the file. Please ensure the file is not scanned/image-based.',
      });
    }

    console.log(`✅ Extracted ${resumeText.split(' ').length} words. Running ATS analysis...`);

    // Run ATS scoring
    const result = await calculateATSScore(resumeText, req.file.originalname);

    console.log(`🎯 Score: ${result.totalScore}/100 (${result.grade}) for ${result.roleInfo?.jobFunction}`);

    res.json({
      success: true,
      fileName: req.file.originalname,
      result,
    });

  } catch (error) {
    console.error('❌ Error processing resume:', error.message);

    if (error.message.includes('Unsupported file type')) {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({
      error: 'Failed to analyze resume. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

/**
 * Error handler for multer file size limit
 */
app.use((err, req, res, next) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ error: 'File too large. Maximum size is 5MB.' });
  }
  if (err.message) {
    return res.status(400).json({ error: err.message });
  }
  next(err);
});

// ── Start Server ─────────────────────────────────────────
app.listen(PORT, () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const baseURL = isProduction 
    ? `https://${process.env.RENDER_EXTERNAL_URL || 'your-app.onrender.com'}`
    : `http://localhost:${PORT}`;
  
  console.log(`🚀 ATS Scorer API running on ${baseURL}`);
  console.log(`📍 Score endpoint: POST ${baseURL}/api/score`);

  if (!process.env.COHERE_API_KEY) {
    console.warn('⚠️  WARNING: COHERE_API_KEY not set');
  }
});
