import mongoose from "mongoose"


const symptomReportSchema = new mongoose.Schema({
  responses: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    required: true
  },
  riskLevel: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: true
  },
  recommendations: [{
    type: String
  }],
  possibleConditions: [{
    condition: String,
    probability: String
  }],
  sessionId: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
});

export default symptomReportSchema
