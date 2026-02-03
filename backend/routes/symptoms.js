import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import SymptomReport from '../models/SymptomReport.js';

const router = express.Router();

// Enhanced symptom analysis logic with friendly recommendations
const analyzeSymptoms = (responses) => {
  let riskScore = 0;
  const recommendations = [];
  const possibleConditions = [];

  // Score based on symptoms
  if (responses.discharge === 'yes-unusual') riskScore += 2;
  if (responses.sores_type && responses.sores_type.length > 0) riskScore += responses.sores_type.length;
  if (responses.pain && responses.pain.length > 0) riskScore += responses.pain.length;
  if (responses.flulike && responses.flulike.length > 0) riskScore += 1;
  if (responses.lastTest === 'never') riskScore += 1;
  if (responses.lastTest === 'over-year') riskScore += 1;

  // Determine risk level (without showing it to user)
  let riskLevel;
  if (riskScore <= 2) {
    riskLevel = 'low';
  } else if (riskScore <= 5) {
    riskLevel = 'medium';
  } else {
    riskLevel = 'high';
  }

  // Generate friendly recommendations based on symptoms
  const hasSymptoms = Object.keys(responses).some(key => 
    responses[key] === 'yes' || responses[key] === 'yes-unusual' || 
    (Array.isArray(responses[key]) && responses[key].length > 0)
  );

  if (hasSymptoms) {
    recommendations.push('Consider scheduling an appointment with a healthcare provider within the next few days. They can properly evaluate your symptoms and recommend appropriate testing if needed.');
    recommendations.push('In the meantime, practice safe hygiene and avoid sexual contact until you\'ve consulted with a professional.');
    
    if (responses.discharge === 'yes-unusual' || responses.pain?.includes('pain-urination')) {
      recommendations.push('Drink plenty of water to stay hydrated and monitor your symptoms closely.');
    }
    
    if (responses.sores_type?.length > 0 || responses.flulike?.length > 0) {
      recommendations.push('Keep track of when symptoms started and any changes you notice - this information will be helpful for your healthcare provider.');
    }
  } else {
    recommendations.push('Based on your responses, you\'re being proactive about your health. Continue practicing safe sex and get tested regularly.');
    recommendations.push('If you develop any symptoms in the future, don\'t hesitate to reach out to a healthcare provider.');
  }

  recommendations.push('Remember to communicate openly with your sexual partners about health and testing.');
  recommendations.push('Access to confidential, judgment-free care is available in your area.');

  // Identify possible conditions based on symptom combinations
  if (responses.sores_type?.includes('fluid-filled-blisters')) {
    possibleConditions.push({
      condition: 'Genital Herpes',
      description: 'Characterized by fluid-filled blisters that are often painful. Highly manageable with proper medical care.'
    });
  }

  if (responses.sores_type?.includes('painful-ulcers')) {
    possibleConditions.push({
      condition: 'Chancroid or other ulcerative conditions',
      description: 'Painful open sores that require professional treatment. Early medical intervention is important.'
    });
  }

  if (responses.sores_type?.includes('cauliflower-like')) {
    possibleConditions.push({
      condition: 'Genital Warts (HPV)',
      description: 'Caused by human papillomavirus. Multiple treatment options are available and highly effective.'
    });
  }

  if (responses.discharge === 'yes-unusual' && responses.texture?.includes('thick-white')) {
    possibleConditions.push({
      condition: 'Yeast Infection',
      description: 'Fungal infection that is very common and easily treated with antifungal medications.'
    });
  }

  if (responses.discharge === 'yes-unusual') {
    possibleConditions.push({
      condition: 'Bacterial Vaginosis or other bacterial infection',
      description: 'Treatable with antibiotics. Symptoms usually improve quickly with proper treatment.'
    });
  }

  if (responses.pain?.includes('pain-urination') || responses.pain?.includes('pain-intimacy')) {
    possibleConditions.push({
      condition: 'Urethritis or Cervicitis',
      description: 'Inflammation of the urethra or cervix. Responsive to appropriate antibiotic treatment.'
    });
  }

  if (responses.itching_rash?.includes('intense-itching') || responses.itching_rash?.includes('burrow-tracks')) {
    possibleConditions.push({
      condition: 'Scabies',
      description: 'Parasitic infection that is treatable with topical medications. Usually clears up quickly with treatment.'
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

// @route   POST /api/symptoms/analyze
// @desc    Analyze symptom responses and generate report
// @access  Public
router.post('/analyze', async (req, res) => {
  try {
    const { responses } = req.body;

    if (!responses || typeof responses !== 'object') {
      return res.status(400).json({ message: 'Invalid symptom responses' });
    }

    // Analyze symptoms
    const { riskLevel, recommendations, possibleConditions, hasSymptoms } = analyzeSymptoms(responses);

    // Generate unique session ID
    const sessionId = uuidv4();

    // Optional: Store report in MongoDB (uncomment if using SymptomReport model)
    const report = await SymptomReport.create({
      responses,
      riskLevel,
      recommendations,
      possibleConditions,
      sessionId,
      hasSymptoms
    });

    res.status(201).json({
      sessionId: report.sessionId,
      riskLevel: report.riskLevel,
      recommendations: report.recommendations,
     
      possibleConditions: report.possibleConditions,
      hasSymptoms: report.hasSymptoms,
      message: 'Your health assessment is complete. Please review the recommendations below.'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error analyzing symptoms' });
  }
});

// @route   GET /api/symptoms/report/:sessionId
// @desc    Get symptom report by session ID
// @access  Public
router.get('/report/:sessionId', async (req, res) => {
  try {
    const report = await SymptomReport.findOne({ sessionId: req.params.sessionId });

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching report' });
  }
});

// @route   GET /api/symptoms/questions
// @desc    Get symptom checker questions with user-provided structure
// @access  Public
router.get('/questions', (req, res) => {
  const questions = [
    {
      id: 'bringYouHere',
      question: 'What brings you here today?',
      type: 'multiple-choice',
      options: [
        'I have symptoms that concern me',
        'I had a recent exposure or encounter',
        'I want to get tested routinely',
        'I\'m here to learn and stay informed'
      ],
      category: 'reason'
    },
    {
      id: 'feeling',
      question: 'How are you feeling right now?',
      type: 'multiple-choice',
      options: [
        'Anxious or worried',
        'Curious and informed',
        'Experiencing discomfort',
        'Just being proactive'
      ],
      category: 'emotion'
    },
    {
      id: 'noticeChanged',
      question: 'When did you first notice something different?',
      type: 'multiple-choice',
      options: [
        'Within the last few days',
        '1-2 weeks ago',
        '2-4 weeks ago',
        'More than a month ago',
        'Not sure'
      ],
      category: 'timeline'
    },
    {
      id: 'discharge',
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
      id: 'sores_bumps_rash',
      question: 'Have you noticed any sores, bumps, or rashes?',
      type: 'multiple-choice',
      options: [
        'Yes, on genital area',
        'Yes, elsewhere on body',
        'No',
        'Not sure'
      ],
      category: 'symptoms'
    },
    {
      id: 'pain',
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
      multiselect: true
    },
    {
      id: 'flulike',
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
      id: 'lastTest',
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
      category: 'testing'
    },
   
    {
      id: 'lastTest',
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
      category: 'testing'
    }
  ];

  res.json(questions);
});

// Reference images endpoint
router.get('/reference-images', (req, res) => {
  const images = {
    skin: [
      { id: 'clear-skin', label: 'Clear Skin', category: 'baseline' },
      { id: 'acne-bumpy', label: 'Acne/Bumpy', category: 'condition' },
      { id: 'patchy-discolored', label: 'Patchy/Discolored', category: 'condition' },
      { id: 'rash-irritation', label: 'Rash/Irritation', category: 'condition' },
      { id: 'blisters-sores', label: 'Blisters/Sores', category: 'condition' },
      { id: 'dry-flaky', label: 'Dry/Flaky Skin', category: 'condition' }
    ],
    texture: [
      { id: 'smooth-no-issues', label: 'Smooth/No Issues', category: 'baseline' },
      { id: 'small-bumps', label: 'Small Bumps', category: 'condition' },
      { id: 'rough-textured', label: 'Rough/Textured', category: 'condition' },
      { id: 'red-inflamed', label: 'Red/Inflamed', category: 'condition' },
      { id: 'swollen-area', label: 'Swollen Area', category: 'condition' }
    ]
  };

  res.json(images);
});

export default router;
