import express from 'express';
const router = express.Router();
import { body, validationResult } from 'express-validator';

import Doctor from '../models/Doctor.js';
import { generateToken } from '../utils/jwt.js';
import { protect } from '../middleware/auth.js';

// @route   POST /api/doctors/register
// @desc    Register a new doctor
// @access  Public
router.post('/register', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('specialization').notEmpty().withMessage('Specialization is required'),
  body('credentials').notEmpty().withMessage('Credentials are required'),
  body('licenseNumber').notEmpty().withMessage('License number is required'),
  body('yearsOfExperience').isInt({ min: 0 }).withMessage('Valid years of experience required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      email,
      password,
      specialization,
      credentials,
      licenseNumber,
      yearsOfExperience,
      bio
    } = req.body;

    // Check if doctor already exists
    const doctorExists = await Doctor.findOne({ email });
    if (doctorExists) {
      return res.status(400).json({ message: 'Doctor already registered with this email' });
    }

    // Create doctor
    const doctor = await Doctor.create({
      name,
      email,
      password,
      specialization,
      credentials,
      licenseNumber,
      yearsOfExperience,
      bio
    });

    if (doctor) {
      res.status(201).json({
        _id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        specialization: doctor.specialization,
        credentials: doctor.credentials,
        licenseNumber: doctor.licenseNumber,
        yearsOfExperience: doctor.yearsOfExperience,
        isVerified: doctor.isVerified,
        token: generateToken(doctor._id)
      });
    } else {
      res.status(400).json({ message: 'Invalid doctor data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// @route   POST /api/doctors/login
// @desc    Authenticate doctor & get token
// @access  Public
router.post('/login', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check for doctor
    const doctor = await Doctor.findOne({ email }).select('+password');

    if (doctor && (await doctor.matchPassword(password))) {
      res.json({
        _id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        specialization: doctor.specialization,
        isVerified: doctor.isVerified,
        responseCount: doctor.responseCount,
        rating: doctor.rating,
        token: generateToken(doctor._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// @route   GET /api/doctors/profile
// @desc    Get doctor profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.doctor._id);
    res.json(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching profile' });
  }
});

// @route   PUT /api/doctors/profile
// @desc    Update doctor profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.doctor._id);

    if (doctor) {
      doctor.name = req.body.name || doctor.name;
      doctor.specialization = req.body.specialization || doctor.specialization;
      doctor.bio = req.body.bio || doctor.bio;
      doctor.yearsOfExperience = req.body.yearsOfExperience || doctor.yearsOfExperience;

      const updatedDoctor = await doctor.save();
      res.json(updatedDoctor);
    } else {
      res.status(404).json({ message: 'Doctor not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating profile' });
  }
});

export default router;
