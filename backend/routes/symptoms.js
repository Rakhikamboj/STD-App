import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { GoogleGenerativeAI } from '@google/generative-ai';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import SymptomReport from '../models/SymptomReport.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();


let model;
if (process.env.GEMINI_API_KEY) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
} else {
  console.warn('Warning: GEMINI_API_KEY missing. AI analysis disabled.');
}


const REFERENCE_IMAGE_PATHS = {
  herpes:   'assets/Genetial-herps.png',
  warts:    'assets/Genital-warts.png',
  scabies:  'assets/Genital-scabies2.png',
  ulcer:    'assets/ulcer.png',
  smooth:   'assets/smooth-skin.png',
  bumpy:    'assets/bumpy-skin.png',
  rough:    'assets/rough-skin.png',
  inflamed: 'assets/inflamed-skin.png',
  swollen:  'assets/swollen-skin.png',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Reads a local asset file and returns a Gemini-compatible inlinePart.
 * Returns null if the file cannot be read.
 */
const loadImageInlinePart = (imageType) => {
  const relativePath = REFERENCE_IMAGE_PATHS[imageType];
  if (!relativePath) return null;

  // Assets live in <project-root>/public/  — adjust if your structure differs
  const absolutePath = path.join(__dirname, '..', 'public', relativePath);
  if (!fs.existsSync(absolutePath)) {
    console.warn(`Image not found: ${absolutePath}`);
    return null;
  }

  const data = fs.readFileSync(absolutePath).toString('base64');
  const ext  = path.extname(absolutePath).replace('.', '').toLowerCase();
  const mimeType = ext === 'jpg' ? 'image/jpeg' : `image/${ext}`;

  return { inlineData: { data, mimeType } };
};

/**
 * Maps imageType labels to human-readable clinical labels used in the prompt.
 */
const LABEL_MAP = {
  herpes:   'Genital herpes – fluid-filled blisters (HSV)',
  warts:    'Genital warts – cauliflower-like growths (HPV)',
  scabies:  'Scabies – parasitic burrow-track rash',
  ulcer:    'Ulcer / open sore – requires clinical evaluation',
  smooth:   'Smooth skin – no visible lesion',
  bumpy:    'Small raised bumps',
  rough:    'Rough / textured skin surface',
  inflamed: 'Red or inflamed skin',
  swollen:  'Swollen area',
};

// ─── Fallback (no Gemini) ─────────────────────────────────────────────────────
const analyzeSymptomsFallback = (responses) => {
  let riskScore = 0;
  const possibleConditions = [];
  const recommendations = [];

  if (responses.q4_discharge === 'Yes, unusual discharge') riskScore += 2;
  if (responses.q5_sores_bumps_rash === 'Yes, on genital area') riskScore += 2;
  if (Array.isArray(responses.q6_pain)) riskScore += responses.q6_pain.length;
  if (Array.isArray(responses.q7_flulike) && responses.q7_flulike.length > 0) riskScore += 1;
  if (responses.q9_lastTest === 'Never tested') riskScore += 1;

  const hasSymptoms = riskScore > 0;

  if (hasSymptoms) {
    recommendations.push('Speaking with a healthcare provider soon would be a positive step.');
    recommendations.push('Track when symptoms started and any changes you notice.');
    recommendations.push('Avoid sexual contact until you have consulted a professional.');
  } else {
    recommendations.push('Continue regular testing as part of routine preventive care.');
    recommendations.push('Open communication with partners supports everyone\'s wellbeing.');
  }
  recommendations.push('Confidential, judgment-free care is always available to you.');

  const selectedImages = Array.isArray(responses.selectedReferenceImages)
    ? responses.selectedReferenceImages
    : [];

  selectedImages.forEach(t => {
    const label = LABEL_MAP[t];
    if (label) possibleConditions.push({ condition: label, description: 'See a provider for confirmation and treatment options.' });
  });

  if (possibleConditions.length === 0) {
    possibleConditions.push({
      condition: hasSymptoms ? 'General consultation recommended' : 'Routine health maintenance',
      description: hasSymptoms
        ? 'Your responses suggest a professional evaluation would be helpful.'
        : 'Great time to discuss sexual health with your provider during a routine visit.',
    });
  }

  return {
    riskLevel: riskScore <= 2 ? 'low' : riskScore <= 5 ? 'medium' : 'high',
    recommendations,
    possibleConditions,
    hasSymptoms,
    analyzedByAI: false,
  };
};

// ─── Multimodal Gemini Analysis ───────────────────────────────────────────────

/**
 * Builds a multimodal Gemini request.
 *
 * For each selected reference image the model receives:
 *   1. The actual image bytes (inlinePart) – pixel-level understanding
 *   2. A text label describing what the image represents – clinical context
 *
 * This dual grounding prevents the model from "hallucinating" visual details
 * from text labels alone.
 */
const analyzeWithGemini = async (responses) => {
  if (!model) return analyzeSymptomsFallback(responses);

  try {
    const selectedImages = Array.isArray(responses.selectedReferenceImages)
      ? responses.selectedReferenceImages.filter(t => t !== 'none')
      : [];

    // ── Build multimodal content parts ────────────────────────────────────────
    const contentParts = [];

    // 1. Include each selected image + its clinical label
    for (const imageType of selectedImages) {
      const inlinePart = loadImageInlinePart(imageType);
      const label = LABEL_MAP[imageType] || imageType;

      if (inlinePart) {
        contentParts.push(inlinePart);  // actual image bytes
        contentParts.push({ text: `Image label: "${label}". Analyze the visual features above and use this label as additional clinical context.` });
      } else {
        // Graceful degradation – image file missing, use label only
        contentParts.push({ text: `Selected symptom label (no image available): "${label}".` });
      }
    }

    // 2. Append condensed symptom summary
    const symptomSummary = buildSymptomSummary(responses);
    contentParts.push({ text: symptomSummary });

    // 3. Append the focused instruction prompt
    contentParts.push({ text: ANALYSIS_PROMPT });

    // ── Call Gemini ────────────────────────────────────────────────────────────
    const result   = await model.generateContent(contentParts);
    const rawText  = await result.response.text();

    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON found in Gemini response');

    const ai = JSON.parse(jsonMatch[0]);

    return {
      riskLevel:         ai.hasSymptoms ? 'medium' : 'low',
      recommendations:   ai.recommendations   || [],
      possibleConditions: ai.possibleConditions || [],
      hasSymptoms:       ai.hasSymptoms        ?? false,
      aiMessage:         ai.supportiveMessage  || '',
      analyzedByAI:      true,
    };
  } catch (err) {
    console.error('Gemini error:', err.message);
    return {
      ...analyzeSymptomsFallback(responses),
      analyzedByAI: false,
      aiError: 'AI analysis temporarily unavailable; using standard assessment.',
    };
  }
};

/**
 * Converts raw form responses into a concise plain-English summary
 * to keep the prompt short and focused.
 */
const buildSymptomSummary = (r) => {
  const lines = [];
  if (r.q1_bringYouHere)       lines.push(`Reason for visit: ${r.q1_bringYouHere}`);
  if (r.q3_noticeChanged)      lines.push(`Onset: ${r.q3_noticeChanged}`);
  if (r.q4_discharge)          lines.push(`Discharge: ${r.q4_discharge}`);
  if (r.q5_sores_bumps_rash)   lines.push(`Sores/bumps/rash: ${r.q5_sores_bumps_rash}`);
  if (r.q6_pain?.length)       lines.push(`Pain: ${r.q6_pain.join(', ')}`);
  if (r.q7_flulike?.length)    lines.push(`Flu-like symptoms: ${r.q7_flulike.join(', ')}`);
  if (r.q9_lastTest)           lines.push(`Last STI test: ${r.q9_lastTest}`);
  if (r.q10_additionalConcerns) lines.push(`Additional concerns: ${r.q10_additionalConcerns}`);
  return `Patient symptom summary:\n${lines.join('\n')}`;
};

// ── Analysis prompt ────────────────────────────────────────────────────────────
// Returns all fields ResultsScreen renders, including incubation, prevalence,
// expandedInfo, and imageType so each condition card is fully self-contained.
const ANALYSIS_PROMPT = `
You are a compassionate sexual-health advisor. Using the image(s) and symptom data above:

1. Ground analysis in BOTH visual features observed AND the clinical labels provided.
2. If an image does not match its label, favour visual evidence and note the discrepancy.
3. Use warm, reassuring language. Emphasise treatability without alarming the user.
4. CRITICAL: Every condition MUST have completely unique wording for description, descriptionNote, and expandedInfo — never reuse the same sentence across conditions.

For each possibleCondition include ALL fields:
- "imageType": exact imageType key corresponding to this condition ("herpes","warts","scabies","ulcer","bumpy","inflamed","swollen","rough","smooth") — null if none.
- "incubation": realistic clinical incubation period string (e.g. "2-12 days") — null if not applicable.
- "prevalence": short phrase on how common this condition is.
- "expandedInfo": 1-2 sentences of unique additional clinical context for THIS condition only.

Respond ONLY with valid JSON — no markdown, no extra text:
{
  "recommendations": ["<4-6 gentle actionable suggestions, each phrased differently>"],
  "possibleConditions": [
    {
      "condition": "<condition name>",
      "imageType": "<imageType key or null>",
      "description": "<unique one-line clinical description>",
      "descriptionNote": "<unique reassuring treatability note>",
      "incubation": "<incubation period or null>",
      "prevalence": "<prevalence phrase>",
      "expandedInfo": "<1-2 sentences unique clinical context>"
    }
  ],
  "supportiveMessage": "<2-3 sentence warm encouraging message>",
  "hasSymptoms": <true|false>
}
`.trim();

// ─── Routes ───────────────────────────────────────────────────────────────────

// POST /api/symptoms/analyze
router.post('/analyze', async (req, res) => {
  try {
    const { responses } = req.body;
    if (!responses || typeof responses !== 'object') {
      return res.status(400).json({ message: 'Invalid symptom responses' });
    }

    const analysis = await analyzeWithGemini(responses);
    const { riskLevel, recommendations, possibleConditions, hasSymptoms, aiMessage, analyzedByAI } = analysis;
    const sessionId = uuidv4();

    try {
      await SymptomReport.create({
        responses, riskLevel, recommendations, possibleConditions,
        sessionId, hasSymptoms,
        selectedReferenceImages: responses.selectedReferenceImages || [],
      });
    } catch (dbErr) {
      console.log('MongoDB storage skipped:', dbErr.message);
    }

    res.status(201).json({
      sessionId,
      recommendations,
      possibleConditions,
      hasSymptoms,
      aiMessage,
      analyzedByAI,
      selectedReferenceImages: responses.selectedReferenceImages || [],
      message: 'Your health assessment is complete. Please review the recommendations below.',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error analyzing symptoms' });
  }
});

router.get('/questions', (req, res) => {
  try {
    const questionsPath = path.join(process.cwd(), 'config/questions.data.json');
    const questions = JSON.parse(fs.readFileSync(questionsPath, 'utf-8'));
    res.json(questions);
  } catch (err) {
    console.error('Failed to load questions:', err.message);
    res.status(500).json({ message: 'Could not load questions' });
  }
});



// GET /api/symptoms/reference-images
router.get('/reference-images', (req, res) => {
  res.json({
    herpes:   { id: 'herpes',   label: 'Blisters/Herpes-like',  description: 'Fluid-filled blisters, often painful',             imagePath: '/assets/Genetial-herps.png',     details: ['Appears 2–7 days after exposure', 'Painful blisters that may rupture', 'Managed with antiviral medications'] },
    warts:    { id: 'warts',    label: 'Warts',                  description: 'Cauliflower-like growths caused by HPV',            imagePath: '/assets/Genital-warts.png',       details: ['May appear weeks to months later', 'Usually painless', 'Multiple effective treatments available'] },
    scabies:  { id: 'scabies',  label: 'Scabies-like Rash',      description: 'Parasitic infection with burrow tracks & itching', imagePath: '/assets/Genital-scabies2.png',    details: ['Intense itching, especially at night', 'Thin wavy burrow lines', 'Treatable with topical medications'] },
    ulcer:    { id: 'ulcer',    label: 'Ulcer/Open Sore',        description: 'Open sores requiring medical evaluation',          imagePath: '/assets/ulcer.png',               details: ['Deep, painful wounds', 'May produce discharge', 'Requires professional treatment'] },
    smooth:   { id: 'smooth',   label: 'Smooth/No Issues',       description: 'Smooth skin with no visible concerns',             imagePath: '/assets/smooth-skin.png',         category: 'texture' },
    bumpy:    { id: 'bumpy',    label: 'Small Bumps',             description: 'Small raised bumps on the skin',                  imagePath: '/assets/bumpy-skin.png',          category: 'texture' },
    rough:    { id: 'rough',    label: 'Rough/Textured',         description: 'Rough or textured skin surface',                  imagePath: '/assets/rough-skin.png',          category: 'texture' },
    inflamed: { id: 'inflamed', label: 'Red/Inflamed',           description: 'Red, inflamed, or irritated skin',                imagePath: '/assets/inflamed-skin.png',       category: 'texture' },
    swollen:  { id: 'swollen',  label: 'Swollen Area',           description: 'Swollen or puffy skin area',                     imagePath: '/assets/swollen-skin.png',         category: 'texture' },
  });
});

export default router;