import mongoose from "mongoose";

const symptomReportSchema = new mongoose.Schema(
  {
    // User's complete questionnaire responses
    responses: {
      type: Object,
      required: true,
    },

    // Risk level determined by analysis
    riskLevel: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },

    // AI-generated or rule-based recommendations
    recommendations: {
      type: [String],
      default: [],
    },

    // Possible conditions identified
    possibleConditions: [
      {
        condition: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],

    // Unique anonymous session identifier
    sessionId: {
      type: String,
      required: true,
      unique: true, 
    },

    // Whether user has concerning symptoms
    hasSymptoms: {
      type: Boolean,
      default: false,
    },

    // Selected reference images
    selectedReferenceImages: {
      type: [String],
      default: [],
      enum: [
        "herpes",
        "warts",
        "yeast",
        "bumpy",
        "scabies",
        "smooth",
        "ulcer",
        "clear",
        "acne",
        "patchy",
        "rash",
        "blisters",
        "dry",
        "rough",
        "inflamed",
        "swollen",
      ],
    },

    // Whether analysis was AI-based
    analyzedByAI: {
      type: Boolean,
      default: false,
    },

    // AI-generated supportive message
    aiMessage: {
      type: String,
    },

    // Auto-delete after 30 days (privacy-first)
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 60 * 24 * 30,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Virtual: days since report created
symptomReportSchema.virtual("daysOld").get(function () {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

// Instance method: anonymized analytics view
symptomReportSchema.methods.anonymize = function () {
  return {
    riskLevel: this.riskLevel,
    hasSymptoms: this.hasSymptoms,
    selectedImages: this.selectedReferenceImages,
    analyzedByAI: this.analyzedByAI,
    createdAt: this.createdAt,
  };
};

// Static: analytics summary
symptomReportSchema.statics.getAnalytics = async function (days = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  return this.aggregate([
    { $match: { createdAt: { $gte: startDate } } },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        withSymptoms: { $sum: { $cond: ["$hasSymptoms", 1, 0] } },
        aiAnalyzed: { $sum: { $cond: ["$analyzedByAI", 1, 0] } },
        avgRiskLevel: {
          $avg: {
            $switch: {
              branches: [
                { case: { $eq: ["$riskLevel", "low"] }, then: 1 },
                { case: { $eq: ["$riskLevel", "medium"] }, then: 2 },
                { case: { $eq: ["$riskLevel", "high"] }, then: 3 },
              ],
              default: 1,
            },
          },
        },
      },
    },
  ]);
};

// Static: most common image selections
symptomReportSchema.statics.getCommonImages = async function (days = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  return this.aggregate([
    { $match: { createdAt: { $gte: startDate } } },
    { $unwind: "$selectedReferenceImages" },
    {
      $group: {
        _id: "$selectedReferenceImages",
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
  ]);
};

const SymptomReport = mongoose.model("SymptomReport", symptomReportSchema);
export default SymptomReport;
