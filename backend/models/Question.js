import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  content: {
    type: String,
    required: [true, 'Please add answer content'],
    minlength: 10
  },
  helpful: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a question title'],
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: [true, 'Please add question content'],
    minlength: 20
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: [
      'Sexual Health',
      'Mental Health',
      'General Health',
      'Reproductive Health',
      'STI/STD',
      'Contraception',
      'Other'
    ]
  },
  isAnonymous: {
    type: Boolean,
    default: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  answers: [answerSchema],
  views: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['open', 'answered', 'closed'],
    default: 'open'
  }
}, {
  timestamps: true
});

// ✅ THIS LINE IS THE KEY
const Question = mongoose.model('Question', questionSchema);

export default Question;
