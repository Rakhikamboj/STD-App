import mongoose from 'mongoose';

const symptomReportSchema = new mongoose.Schema({
  // User's complete questionnaire responses
  responses: {
    type: Object,
    required: true
  },
  
  // Risk level determined by analysis
  riskLevel: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: true
  },
  
  // AI-generated or rule-based recommendations
  recommendations: [{
    type: String
  }],
  
  // Possible conditions identified
  possibleConditions: [{
    condition: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }],
  
  // Unique session identifier
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  
  // Whether user has concerning symptoms
  hasSymptoms: {
    type: Boolean,
    default: false
  },
  
  // NEW: Store which reference images user selected
  selectedReferenceImages: [{
    type: String,
    enum: [
      // Medical reference images
      'herpes',
      'warts', 
      'yeast',
      'scabies',
      'ulcer',
      // Visual selection images
      'clear',
      'acne',
      'patchy',
      'rash',
      'blisters',
      'dry'
    ]
  }],
  
  // Whether analysis was done by AI or fallback
  analyzedByAI: {
    type: Boolean,
    default: false
  },
  
  // AI-generated supportive message (if available)
  aiMessage: {
    type: String
  },
  
  // Timestamp
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 2592000 // Auto-delete after 30 days for privacy
  }
}, {
  timestamps: true
});

// Index for faster session lookups
symptomReportSchema.index({ sessionId: 1 });

// Index for date-based queries
symptomReportSchema.index({ createdAt: -1 });

// Virtual for days since report
symptomReportSchema.virtual('daysOld').get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

// Method to anonymize sensitive data (for analytics)
symptomReportSchema.methods.anonymize = function() {
  return {
    riskLevel: this.riskLevel,
    hasSymptoms: this.hasSymptoms,
    selectedImages: this.selectedReferenceImages,
    analyzedByAI: this.analyzedByAI,
    createdAt: this.createdAt
  };
};

// Static method to get analytics
symptomReportSchema.statics.getAnalytics = async function(days = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  return await this.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        withSymptoms: {
          $sum: { $cond: ['$hasSymptoms', 1, 0] }
        },
        aiAnalyzed: {
          $sum: { $cond: ['$analyzedByAI', 1, 0] }
        },
        avgRiskLevel: {
          $avg: {
            $switch: {
              branches: [
                { case: { $eq: ['$riskLevel', 'low'] }, then: 1 },
                { case: { $eq: ['$riskLevel', 'medium'] }, then: 2 },
                { case: { $eq: ['$riskLevel', 'high'] }, then: 3 }
              ],
              default: 1
            }
          }
        }
      }
    }
  ]);
};

// Static method to get most common image selections
symptomReportSchema.statics.getCommonImages = async function(days = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  return await this.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate }
      }
    },
    {
      $unwind: '$selectedReferenceImages'
    },
    {
      $group: {
        _id: '$selectedReferenceImages',
        count: { $sum: 1 }
      }
    },
    {
      $sort: { count: -1 }
    }
  ]);
};

const SymptomReport = mongoose.model('SymptomReport', symptomReportSchema);

export default SymptomReport;