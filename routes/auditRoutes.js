const express = require("express");
const router = express.Router();
const AuditModel = require("../models/AuditModel");

// GET: Retrieve Audit by Ticket ID
router.get("/:ticketID", async (req, res) => {
    try {
        const audit = await AuditModel.findOne({ ticketID: req.params.ticketID });
        res.json(audit || {});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST: Save Audit Data
router.post("/", async (req, res) => {
    try {
        const newAudit = new AuditModel(req.body);
        await newAudit.save();
        res.status(201).json(newAudit);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;  // ✅ Make sure this line is present!
