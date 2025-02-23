const express = require("express");
const router = express.Router();
const TicketModel = require("../models/TicketModel");

// ✅ Route to Bulk Insert Tickets from CSV Data
router.post("/bulk-insert", async (req, res) => {
    try {
        console.log("📥 Received bulk insert request");

        // Debugging: Log request headers and body
        console.log("🔍 Headers:", req.headers);
        console.log("🔍 Body:", JSON.stringify(req.body, null, 2));

        // Validate request body
        if (!req.body || !Array.isArray(req.body.tickets) || req.body.tickets.length === 0) {
            console.warn("⚠️ Invalid or empty data format received.");
            return res.status(400).json({ error: "Invalid or empty data format. Expecting { tickets: [...] }" });
        }

        // Validate each ticket object before inserting
        for (const ticket of req.body.tickets) {
            if (!ticket.ticketID || !ticket.studentEmail || !ticket.date || !ticket.mobile || !ticket.category) {
                return res.status(400).json({ error: "Missing required ticket fields. Ensure each ticket has ticketID, studentEmail, date, mobile, and category." });
            }
        }

        // Insert tickets in bulk
        const insertedTickets = await TicketModel.insertMany(req.body.tickets, { ordered: false });

        console.log(`✅ Inserted ${insertedTickets.length} tickets successfully.`);
        res.status(201).json({
            message: "Tickets inserted successfully",
            count: insertedTickets.length,
            insertedTickets,
        });
    } catch (err) {
        console.error("❌ Error inserting tickets:", err.message);
        res.status(500).json({ error: "Failed to insert tickets", details: err.message });
    }
});

// ✅ GET All Tickets (For Debugging & Auditing Page)
router.get("/", async (req, res) => {
    try {
        console.log("🔍 Fetching all tickets...");

        const tickets = await TicketModel.find();

        if (!tickets.length) {
            console.warn("⚠️ No tickets found in the database.");
            return res.status(404).json({ error: "No tickets available" });
        }

        console.log(`✅ Found ${tickets.length} tickets.`);
        res.json(tickets);
    } catch (err) {
        console.error("❌ Error fetching tickets:", err.message);
        res.status(500).json({ error: "Failed to fetch tickets", details: err.message });
    }
});

// ✅ GET Ticket by Ticket ID
router.get("/:ticketID", async (req, res) => {
    try {
        console.log(`🔍 Searching for Ticket ID: ${req.params.ticketID}`);

        const ticket = await TicketModel.findOne({ ticketID: req.params.ticketID });

        if (!ticket) {
            console.warn(`⚠️ Ticket ID ${req.params.ticketID} not found.`);
            return res.status(404).json({ error: "Ticket not found" });
        }

        console.log(`✅ Found Ticket ID ${req.params.ticketID}`);
        res.json(ticket);
    } catch (err) {
        console.error("❌ Error fetching ticket:", err.message);
        res.status(500).json({ error: "Failed to fetch ticket", details: err.message });
    }
});

module.exports = router;
