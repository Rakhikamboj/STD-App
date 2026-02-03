
import { body, validationResult } from 'express-validator';
import Question from '../models/Question.js';
import Doctor from '../models/Doctor.js';
import { protect, verifiedOnly } from '../middleware/auth.js'
import express from 'express'
const router = express.Router();
// @route   POST /api/questions
// @desc    Create a new question (anonymous, no auth required)
// @access  Public
router.post('/', [
  body('title').trim().notEmpty().isLength({ max: 200 }).withMessage('Title is required (max 200 characters)'),
  body('content').trim().isLength({ min: 20 }).withMessage('Content must be at least 20 characters'),
  body('category').isIn([
    'Sexual Health',
    'Mental Health',
    'General Health',
    'Reproductive Health',
    'STI/STD',
    'Contraception',
    'Other'
  ]).withMessage('Invalid category')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, category, tags } = req.body;
console.log('Question model:', Question);

    const question = await Question.create({
      title,
      content,
      category,
      tags: tags || [],
      isAnonymous: true
    });

    res.status(201).json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error creating question' });
  }
});

// @route   GET /api/questions/community
// @desc    Get all questions with filtering and pagination
// @access  Public
router.get('/community', async (req, res) => {
  try {
    const { category, status = "open", search, page = 1, limit = 10 } = req.query;
    
    let query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (status) {
      query.status = status;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }
    console.log("thjis is community route--", query)

    const questions = await Question.find(query)
      .populate('answers.doctor', 'name specialization rating')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Question.countDocuments(query);

    res.json({
      questions,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching questions' });
  }
});
// @route   GET /api/questions/stats/summary
// @desc    Get question statistics
// @access  Public
router.get('/stats/summary', async (req, res) => {
  try {
    const totalQuestions = await Question.countDocuments();
    const answeredQuestions = await Question.countDocuments({ status: 'answered' });
    const openQuestions = await Question.countDocuments({ status: 'open' });

    res.json({
      total: totalQuestions,
      answered: answeredQuestions,
      open: openQuestions,
      answerRate: totalQuestions > 0 ? ((answeredQuestions / totalQuestions) * 100).toFixed(1) : 0
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching stats' });
  }
});
// @route   GET /api/questions/:id
// @desc    Get single question by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate('answers.doctor', 'name specialization rating bio');

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Increment views
    question.views += 1;
    await question.save();

    res.json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching question' });
  }
});

// @route   POST /api/questions/:id/answers
// @desc    Add answer to a question
// @access  Private (verified doctors only)
router.post('/:id/answers', [
  protect,
  verifiedOnly,
  body('content').trim().isLength({ min: 10 }).withMessage('Answer must be at least 10 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const answer = {
      doctor: req.doctor._id,
      content: req.body.content
    };

    question.answers.push(answer);
    question.status = 'answered';

    await question.save();

    // Update doctor's response count
    await Doctor.findByIdAndUpdate(req.doctor._id, {
      $inc: { responseCount: 1 }
    });

    const updatedQuestion = await Question.findById(req.params.id)
      .populate('answers.doctor', 'name specialization rating bio');

    res.status(201).json(updatedQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error adding answer' });
  }
});

// @route   PUT /api/questions/:questionId/answers/:answerId/helpful
// @desc    Mark answer as helpful
// @access  Public
router.put('/:questionId/answers/:answerId/helpful', async (req, res) => {
  try {
    const question = await Question.findById(req.params.questionId);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const answer = question.answers.id(req.params.answerId);

    if (!answer) {
      return res.status(404).json({ message: 'Answer not found' });
    }

    answer.helpful += 1;
    await question.save();

    res.json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating helpful count' });
  }
});



export default router;
