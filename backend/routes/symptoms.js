import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { GoogleGenerativeAI } from '@google/generative-ai';
import SymptomReport from '../models/SymptomReport.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Initialize Gemini AI
let genAI;
let model;

if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  model = genAI.getGenerativeModel({ model: 'gemini-pro' });
} else {
  console.warn('Warning: GEMINI_API_KEY not found in environment variables. AI analysis will be disabled.');
}

// Fallback symptom analysis (when Gemini is not available)
const analyzeSymptomsFallback = (responses) => {
  let riskScore = 0;
  const recommendations = [];
  const possibleConditions = [];

  // Extract key symptoms
  const discharge = responses.q4_discharge;
  const bumps = responses.q5_sores_bumps_rash;
  const pain = responses.q6_pain || [];
  const flulike = responses.q7_flulike || [];
  const bumpDetails = responses.q13_bumpsOrSores || [];
  const dischargeDetail = responses.q16_discharge_detail || [];
  const lastTest = responses.q9_lastTest;

  // Score based on symptoms
  if (discharge === 'Yes, unusual discharge') riskScore += 2;
  if (bumps === 'Yes, on genital area') riskScore += 2;
  if (Array.isArray(pain) && pain.length > 0) riskScore += pain.length;
  if (Array.isArray(flulike) && flulike.length > 0) riskScore += 1;
  if (lastTest === 'Never tested') riskScore += 1;

  // Determine risk level
  let riskLevel;
  if (riskScore <= 2) {
    riskLevel = 'low';
  } else if (riskScore <= 5) {
    riskLevel = 'medium';
  } else {
    riskLevel = 'high';
  }

  const hasSymptoms = Object.keys(responses).some(key => {
    const val = responses[key];
    return val === 'yes' || val === 'Yes, unusual discharge' || val === 'Yes, on genital area' ||
      (Array.isArray(val) && val.length > 0 && val[0] !== 'None of these describe what I see');
  });

  // Generate recommendations
  if (hasSymptoms) {
    recommendations.push('Consider scheduling an appointment with a healthcare provider within the next few days.');
    recommendations.push('Practice safe hygiene and avoid sexual contact until you\'ve consulted with a professional.');
    recommendations.push('Keep track of when symptoms started and any changes you notice.');
  } else {
    recommendations.push('Continue practicing safe sex and get tested regularly.');
    recommendations.push('If you develop any symptoms, don\'t hesitate to reach out to a healthcare provider.');
  }

  recommendations.push('Remember to communicate openly with your sexual partners about health and testing.');
  recommendations.push('Access to confidential, judgment-free care is available.');

  // Identify possible conditions based on selected reference images
  if (Array.isArray(responses.selectedReferenceImages)) {
    responses.selectedReferenceImages.forEach(imageType => {
      if (imageType === 'herpes') {
        possibleConditions.push({
          condition: 'Genital Herpes (HSV)',
          description: 'Characterized by fluid-filled blisters that are often painful. Highly manageable with proper medical care and antiviral medications.'
        });
      } else if (imageType === 'warts') {
        possibleConditions.push({
          condition: 'Genital Warts (HPV)',
          description: 'Caused by human papillomavirus. Multiple effective treatment options available, and vaccines can prevent certain types of HPV.'
        });
      } else if (imageType === 'yeast') {
        possibleConditions.push({
          condition: 'Yeast Infection',
          description: 'Fungal infection that is very common and easily treated with antifungal medications.'
        });
      } else if (imageType === 'scabies') {
        possibleConditions.push({
          condition: 'Scabies',
          description: 'Parasitic infection treatable with topical medications. Contagious through close contact.'
        });
      } else if (imageType === 'ulcer') {
        possibleConditions.push({
          condition: 'Ulcerative Lesions',
          description: 'Requires professional medical evaluation to determine the underlying cause and appropriate treatment.'
        });
      }
    });
  }

  if (possibleConditions.length === 0 && hasSymptoms) {
    possibleConditions.push({
      condition: 'General health consultation recommended',
      description: 'Your symptoms warrant professional medical evaluation to determine the underlying cause and best course of action.'
    });
  } else if (possibleConditions.length === 0) {
    possibleConditions.push({
      condition: 'Routine health maintenance',
      description: 'Continue regular check-ups and preventive care. This is a great opportunity to discuss sexual health with your provider.'
    });
  }

  return { riskLevel, recommendations, possibleConditions, hasSymptoms };
};

// Gemini AI-powered symptom analysis (feedback only, no image generation)
const analyzeWithGemini = async (responses) => {
  if (!model) {
    console.log('Gemini not available, using fallback analysis');
    return analyzeSymptomsFallback(responses);
  }

  try {
    // Prepare symptom data for Gemini
    const symptomData = JSON.stringify(responses, null, 2);
    
    const prompt = `You are a compassionate, knowledgeable sexual health advisor. A user has completed a confidential health assessment with the following responses:

${symptomData}

Based on these responses, please provide:

1. A list of 4-6 personalized, actionable recommendations (as an array of strings)
2. Possible conditions that match their symptoms (as an array of objects with "condition" and "description" fields)
3. An empathetic, encouraging message about their health journey

Important guidelines:
- Be warm, supportive, and non-judgmental
- Emphasize that seeking information is a positive step
- Recommend professional medical consultation when appropriate
- Focus on education and empowerment
- Avoid creating unnecessary anxiety
- If symptoms are present, encourage timely medical attention
- If no concerning symptoms, reinforce preventive care
- Consider the reference images they selected (if any) in your analysis

Please respond in the following JSON format:
{
  "recommendations": ["recommendation 1", "recommendation 2", ...],
  "possibleConditions": [
    {
      "condition": "Condition Name",
      "description": "Brief, reassuring description with treatment outlook"
    }
  ],
  "supportiveMessage": "An encouraging, personalized message",
  "hasSymptoms": true/false
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const aiAnalysis = JSON.parse(jsonMatch[0]);
      
      return {
        riskLevel: aiAnalysis.hasSymptoms ? 'medium' : 'low',
        recommendations: aiAnalysis.recommendations || [],
        possibleConditions: aiAnalysis.possibleConditions || [],
        hasSymptoms: aiAnalysis.hasSymptoms || false,
        aiMessage: aiAnalysis.supportiveMessage || '',
        analyzedByAI: true
      };
    } else {
      throw new Error('Could not parse AI response');
    }
  } catch (error) {
    console.error('Gemini AI error:', error.message);
    // Fallback to rule-based analysis
    return {
      ...analyzeSymptomsFallback(responses),
      analyzedByAI: false,
      aiError: 'AI analysis temporarily unavailable, using standard assessment'
    };
  }
};

// @route   POST /api/symptoms/analyze
// @desc    Analyze symptom responses with Gemini AI and generate report
// @access  Public
router.post('/analyze', async (req, res) => {
  try {
    const { responses } = req.body;

    if (!responses || typeof responses !== 'object') {
      return res.status(400).json({ message: 'Invalid symptom responses' });
    }

    // Analyze symptoms with Gemini AI
    const analysis = await analyzeWithGemini(responses);
    const { riskLevel, recommendations, possibleConditions, hasSymptoms, aiMessage, analyzedByAI } = analysis;

    // Generate unique session ID
    const sessionId = uuidv4();

    // Store report in MongoDB
    try {
      await SymptomReport.create({
        responses,
        riskLevel,
        recommendations,
        possibleConditions,
        sessionId,
        hasSymptoms,
        selectedReferenceImages: responses.selectedReferenceImages || []
      });
    } catch (dbError) {
      console.log('MongoDB storage skipped:', dbError.message);
    }

    res.status(201).json({
      sessionId,
      recommendations,
      possibleConditions,
      hasSymptoms,
      aiMessage,
      analyzedByAI,
      selectedReferenceImages: responses.selectedReferenceImages || [],
      message: 'Your health assessment is complete. Please review the recommendations below.'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error analyzing symptoms' });
  }
});

// @route   GET /api/symptoms/questions
// @desc    Get symptom checker questions (19 questions with reference image support)
// @access  Public
router.get('/questions', (req, res) => {
  const questions = [
    {
      id: 'q1_bringYouHere',
      question: 'What brings you here today?',
      type: 'multiple-choice',
      options: [
        'I have symptoms that concern me',
        'I had a recent exposure or encounter',
        'I want to get tested routinely',
        'I\'m here to learn and stay informed'
      ],
      category: 'reason',
      sensitive: false
    },
    {
      id: 'q2_feeling',
      question: 'How are you feeling right now?',
      type: 'multiple-choice',
      options: [
        'Anxious or worried',
        'Curious and informed',
        'Experiencing discomfort',
        'Just being proactive'
      ],
      category: 'emotion',
      sensitive: false
    },
    {
      id: 'q3_noticeChanged',
      question: 'When did you first notice something different?',
      type: 'multiple-choice',
      options: [
        'Within the last few days',
        '1-2 weeks ago',
        '2-4 weeks ago',
        'More than a month ago',
        'Not sure'
      ],
      category: 'timeline',
      sensitive: false
    },
    {
      id: 'q4_discharge',
      question: 'Are you experiencing any unusual discharge?',
      type: 'multiple-choice',
      options: [
        'Yes, unusual discharge',
        'No discharge',
        'Not sure',
        'Prefer not to answer'
      ],
      category: 'symptoms'
    },
    {
      id: 'q5_sores_bumps_rash',
      question: 'Have you noticed any sores, bumps, or rashes??',
      type: 'multiple-choice',
      options: [
       'Yes, on genital area',
       'Yes, elsewhere on body',
       'No',
       'Not sure'
      ],
      category: 'symptoms',
      sensitive: true,
      sensitiveMessage: 'This is a sensitive question. You can skip it if you\'re not comfortable answering. Your privacy and comfort matter.',
      showReferenceImages: true,
      helpText: 'This helps us guide you without needing to see or store any photos. Your answers are private and stay on your device.'
    },
    {
      id: 'q6_pain',
      question: 'Are you experiencing pain or discomfort?',
      type: 'multiple-choice',
      options: [
        'Pain during urination',
        'Abdominal or pelvic pain',
        'Pain during intimacy',
        'Genital itching or irritation',
        'No pain',
        'Other'
      ],
      category: 'symptoms',
      multiselect: true,
      sensitive: true,
      sensitiveMessage: 'This is a sensitive question. You can skip it if you\'re not comfortable answering. Your privacy and comfort matter.'
    },
    {
      id: 'q7_flulike',
      question: 'Have you had any flu-like symptoms?',
      type: 'multiple-choice',
      options: [
        'Fever or chills',
        'Fatigue',
        'Swollen glands',
        'Body aches',
        'None of these'
      ],
      category: 'symptoms',
      multiselect: true
    },
    {
      id: 'referenceImages',
      question: 'Would you like to see reference images to help identify your symptoms?',
      type: 'yes-no',
      category: 'visual'
    },
    {
      id: 'q9_lastTest',
      question: 'When was your last STI test?',
      type: 'multiple-choice',
      options: [
        'Within the last 3 months',
        '3-6 months ago',
        '6-12 months ago',
        'Over a year ago',
        'Never tested',
        'Prefer not to answer'
      ],
      category: 'testing',
      sensitive: false
    },
    
     {
      id: 'q10_additionalConcerns',
      question: 'Do you have any additional concerns?',
      type: 'text',
      placeholder: 'Please describe any other concerns you may have (optional)...',
      category: 'concerns',
      sensitive: true,
      sensitiveMessage: 'This is a sensitive question. You can skip it if you\'re not comfortable answering. Your privacy and comfort matter.'
    },
    {
      id: 'q11_skinCondition',
      question: 'Which image best matches your skin condition or symptoms? This helps us guide you without needing to see or store any photos. Your answers are private and stay on your device.',
       type: 'image-selection',
      options: [
        { value: 'clear', label: 'Clear Skin', imageType: 'clear' },
        { value: 'acne', label: 'Acne/Bumpy', imageType: 'acne' },
        { value: 'patchy', label: 'Patchy/Discolored', imageType: 'patchy' },
        { value: 'rash', label: 'Rash/Irritation', imageType: 'rash' },
        { value: 'blisters', label: 'Blisters/Sores', imageType: 'blisters' },
        { value: 'dry', label: 'Dry/Flaky Skin', imageType: 'dry' }
      ],
      category: 'visual-detail',
      sensitive: true,
      sensitiveMessage: 'This is a sensitive question. You can skip it if you\'re not comfortable answering. Your privacy and comfort matter.'
    },
    {
      id: 'q12_texture',
      question: 'Which texture best describes what you\'re experiencing? This helps us guide you without needing to see or store any photos. Your answers are private and stay on your device.',
      type: 'image-selection',
      category: 'visual-detail',
      sensitive: true,
      sensitiveMessage: 'This is a sensitive question. You can skip it if you\'re not comfortable answering. Your privacy and comfort matter.'
    },
    {
      id: 'q13_bumpsOrSores',
      question: 'If you have bumps or sores in the genital area, what do they look or feel like?',
      type: 'multiple-choice',
      options: [
        'Small fluid-filled blisters (like tiny water bubbles)',
        'Painful red sores or ulcers',
        'Clustered or grouped together',
        'Itchy or tingling before they appear',
        'Crust over or scab as they heal',
        'Swollen or tender lymph nodes nearby',
        'None of these describe what I see'
      ],
      category: 'symptom-detail',
      multiselect: true,
      sensitive: true,
      sensitiveMessage: 'This is a sensitive question. You can skip it if you\'re not comfortable answering. Your privacy and comfort matter.'
    },
    {
      id: 'q14_soreDescription',
      question: 'If you notice a sore or lesion, which of these best describes it?',
      type: 'multiple-choice',
      options: [
        'Single, round, painless sore (chancre)',
        'Firm to the touch with raised edges',
        'Located on or near genitals, mouth, or anus',
        'Does not hurt or itch',
        'Appears clean with no pus or discharge',
        'Heals on its own after a few weeks',
        'None of these describe what I see'
      ],
      category: 'symptom-detail',
      multiselect: true,
      sensitive: true,
      sensitiveMessage: 'This is a sensitive question. You can skip it if you\'re not comfortable answering. Your privacy and comfort matter.'
    },
    {
      id: 'q15_genitalBumps',
      question: 'If you see or feel bumps in the genital area, what do they look like?',
      type: 'multiple-choice',
      options: [
        'Small, flesh-colored or gray bumps',
        'Cauliflower-like texture (grouped together)',
        'Flat or slightly raised',
        'Soft to the touch',
        'May be itchy but usually painless',
        'Can appear alone or in clusters',
        'None of these describe what I see'
      ],
      category: 'symptom-detail',
      multiselect: true,
      sensitive: true,
      sensitiveMessage: 'This is a sensitive question. You can skip it if you\'re not comfortable answering. Your privacy and comfort matter.'
    },
    {
      id: 'q16_discharge_detail',
      question: 'If you have discharge or irritation, what does the area feel or look like?',
      type: 'multiple-choice',
      options: [
        'Thick, white discharge (like cottage cheese)',
        'Red, swollen, or irritated skin',
        'Intense itching or burning',
        'Soreness or discomfort',
        'Rash with small red patches',
        'Painful during urination or sex',
        'None of these describe what I experience'
      ],
      category: 'symptom-detail',
      multiselect: true,
      sensitive: true,
      sensitiveMessage: 'This is a sensitive question. You can skip it if you\'re not comfortable answering. Your privacy and comfort matter.'
    },
    {
      id: 'q17_itching_rash',
      question: 'If you have itching or a rash, what does it look or feel like?',
      type: 'multiple-choice',
      options: [
        'Intense itching, especially at night',
        'Small red bumps or blisters',
        'Thin, wavy lines on the skin (burrow tracks)',
        'Rash in skin folds or between fingers',
        'Scaly or crusty patches',
        'Affects genital area, hands, or wrists',
        'None of these describe what I see'
      ],
      category: 'symptom-detail',
      multiselect: true,
      sensitive: true,
      sensitiveMessage: 'This is a sensitive question. You can skip it if you\'re not comfortable answering. Your privacy and comfort matter.'
    },
    {
      id: 'q18_painfulSores',
      question: 'If you have painful sores, which of these best describes them?',
      type: 'multiple-choice',
      options: [
        'Painful, deep ulcers (open sores)',
        'Soft to the touch with irregular edges',
        'Bleeds easily when touched',
        'Gray or yellowish base with pus',
        'Swollen, painful lymph nodes in the groin',
        'Multiple sores may appear',
        'None of these describe what I see'
      ],
      category: 'symptom-detail',
      multiselect: true,
      sensitive: true,
      sensitiveMessage: 'This is a sensitive question. You can skip it if you\'re not comfortable answering. Your privacy and comfort matter.'
    },
    {
      id: 'q19_skinBumps',
      question: 'If you notice small bumps on your skin, what do they look like?',
      type: 'multiple-choice',
      options: [
        'Small, round, dome-shaped bumps',
        'Flesh-colored, pink, or white',
        'Shiny or pearly appearance',
        'Dimple or pit in the center',
        'Firm but painless to touch',
        'Can appear in clusters',
        'None of these describe what I see'
      ],
      category: 'symptom-detail',
      multiselect: true,
      sensitive: true,
      sensitiveMessage: 'This is a sensitive question. You can skip it if you\'re not comfortable answering. Your privacy and comfort matter.'
    }
  ];

  res.json(questions);
});


// @route   GET /api/symptoms/reference-images
// @desc    Get reference image information with actual image paths
// @access  Public
router.get('/reference-images', (req, res) => {
  const images = {
    herpes: {
      id: 'herpes',
      label: 'Genital Herpes (HSV)',
      description: 'Fluid-filled blisters that are often painful',
      imagePath: '/assets/Genetial-herps.png',
      details: [
        'Typically appears 2-7 days after exposure',
        'Blisters are painful and may rupture',
        'Highly treatable with antiviral medications',
        'Can be managed effectively long-term'
      ]
    },
    warts: {
      id: 'warts',
      label: 'Genital Warts (HPV)',
      description: 'Cauliflower-like growths caused by HPV',
      imagePath: '/assets/Genital-warts.png',
      details: [
        'Can appear weeks to months after exposure',
        'Usually painless but may cause itching',
        'Multiple effective treatment options available',
        'Vaccines can prevent certain types of HPV'
      ]
    },
    scabies: {
      id: 'scabies',
      label: 'Scabies',
      description: 'Parasitic infection with burrow tracks and intense itching',
      imagePath: '/assets/scabies.png',
      details: [
        'Intense itching, especially at night',
        'Thin wavy lines (burrows) on skin',
        'Contagious through close contact',
        'Treatable with topical medications'
      ]
    },
    ulcer: {
      id: 'ulcer',
      label: 'Ulcerative Lesions',
      description: 'Painful open sores requiring medical evaluation',
      imagePath: '/assets/ulcer.png',
      details: [
        'Deep, painful open wounds',
        'Irregular edges and may produce discharge',
        'Often accompanied by swollen lymph nodes',
        'Requires professional treatment'
      ]
    },
    // Visual selection images for q5
    clear: {
      id: 'clear',
      label: 'Clear Skin',
      description: 'No visible skin concerns',
      imagePath: '/assets/clear-skin.jpg',
      category: 'visual-selection'
    },
    acne: {
      id: 'acne',
      label: 'Acne/Bumpy',
      description: 'Raised bumps or acne-like appearance',
      imagePath: '/assets/acne-bumpy.jpg',
      category: 'visual-selection'
    },
    patchy: {
      id: 'patchy',
      label: 'Patchy/Discolored',
      description: 'Uneven skin tone or discoloration',
      imagePath: '/assets/patchy.jpg',
      category: 'visual-selection'
    },
    rash: {
      id: 'rash',
      label: 'Rash/Irritation',
      description: 'Red, irritated, or inflamed skin',
      imagePath: '/assets/rash.jpg',
      category: 'visual-selection'
    },
    blisters: {
      id: 'blisters',
      label: 'Blisters/Sores',
      description: 'Fluid-filled blisters or open sores',
      imagePath: '/assets/blisters.jpg',
      category: 'visual-selection'
    },
    dry: {
      id: 'dry',
      label: 'Dry/Flaky Skin',
      description: 'Dry, scaly, or flaky appearance',
      imagePath: '/assets/dry-flaky.jpg',
      category: 'visual-selection'
    }
  };

  res.json(images);
});

export default router;