const mongoose = require("mongoose");

// Define Audit Schema
const AuditSchema = new mongoose.Schema({
    ticketID: { type: String, required: true, unique: true },
    studentEmail: { type: String, required: true },
    date: { type: String, required: true },
    mobile: { type: String, required: true },
    category: { type: String, required: true },
    assignedTo: { type: String, required: true },

    // Scores for different assessment criteria (1-5 scale)
    auditScores: {
        adherence: { type: Number, required: true, min: 1, max: 5 },
        timeliness: { type: Number, required: true, min: 1, max: 5 },
        professionalTone: { type: Number, required: true, min: 1, max: 5 },
        documentation: { type: Number, required: true, min: 1, max: 5 },
        accuracy: { type: Number, required: true, min: 1, max: 5 },
        resolution: { type: Number, required: true, min: 1, max: 5 },
        caseOwnership: { type: Number, required: true, min: 1, max: 5 },
        customerSatisfaction: { type: Number, required: true, min: 1, max: 5 }
    },

    // Overall performance
    totalScore: { type: Number, required: true },
    averageScore: { type: Number, required: true },
    performanceRating: { type: String, required: true },

    // Auditor's additional comments
    comments: {
        highlights: { type: String, default: "" },
        improvementAreas: { type: String, default: "" }
    },

    createdAt: { type: Date, default: Date.now } // Auto-generated timestamp
});

// Create Model
const AuditModel = mongoose.model("Audit", AuditSchema);

module.exports = AuditModel;
