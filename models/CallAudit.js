const mongoose = require("mongoose");

const CallAuditSchema = new mongoose.Schema({
    agentName: String,
    customerNumber: String,
    callDuration: String,
    status: String,
    comments: String
}, { timestamps: true });

const CallAudit = mongoose.model("CallAudit", CallAuditSchema);
module.exports = CallAudit; // ✅ Ensure model is correctly exported
