const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
    ticketID: { type: String, required: true, unique: true },
    studentEmail: { type: String, required: true },
    date: { type: String, required: true },  // Ensure correct date format
    mobile: { type: String, required: true },
    category: { type: String, required: true }
});

module.exports = mongoose.model("Ticket", TicketSchema);
