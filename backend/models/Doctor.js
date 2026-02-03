import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  specialization: {
    type: String,
    required: [true, 'Please add your specialization']
  },
  credentials: {
    type: String,
    required: [true, 'Please provide your medical credentials'],
    trim: true
  },
  licenseNumber: {
    type: String,
    required: [true, 'Please provide your medical license number'],
    trim: true
  },
  yearsOfExperience: {
    type: Number,
    required: [true, 'Please add years of experience'],
    min: 0
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  bio: {
    type: String,
    maxlength: 500
  },
  responseCount: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  }
}, {
  timestamps: true
});

// Hash password before saving
doctorSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match password method
doctorSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('Doctor', doctorSchema);

