import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AuditDetails = () => {
    const { ticketID } = useParams();
    const navigate = useNavigate();
    
    const [ticketData, setTicketData] = useState(null);
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(""); // Store error message

    // State for audit scores
    const [scores, setScores] = useState({
        adherence: 1, timeliness: 1, professionalTone: 1, documentation: 1,
        accuracy: 1, resolution: 1, caseOwnership: 1, customerSatisfaction: 1
    });

    // State for comments
    const [comments, setComments] = useState({
        highlights: "",
        improvementAreas: ""
    });

    // 🔹 Fetch Ticket Data when component mounts
    useEffect(() => {
        const fetchTicketDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/tickets/${ticketID}`);
                if (response.data) {
                    setTicketData(response.data);
                } else {
                    throw new Error("No ticket data found.");
                }
            } catch (error) {
                console.error("❌ Error fetching ticket details:", error);
                setError("Failed to fetch ticket details.");
            } finally {
                setLoading(false);
            }
        };

        fetchTicketDetails();
    }, [ticketID]);

    // Handle input change for scores
    const handleScoreChange = (e) => {
        setScores({ ...scores, [e.target.name]: Number(e.target.value) });
    };

    // Handle input change for comments
    const handleCommentChange = (e) => {
        setComments({ ...comments, [e.target.name]: e.target.value });
    };

    // Calculate scores dynamically
    const totalScore = Object.values(scores).reduce((acc, val) => acc + val, 0);
    const averageScore = (totalScore / 8).toFixed(2);
    const performanceRating =
        averageScore >= 4.5 ? "⭐⭐⭐⭐⭐" :
        averageScore >= 3.5 ? "⭐⭐⭐⭐" : "⭐⭐⭐";

    // 🔹 Handle form submission
    const handleSubmit = async () => {
        if (!ticketData || !ticketData.studentEmail) {
            setError("Ticket details are missing. Please try again.");
            return;
        }

        const auditData = {
            ticketID,
            studentEmail: ticketData.studentEmail, // Ensuring studentEmail is included
            scores,
            totalScore,
            averageScore,
            performanceRating,
            comments
        };

        try {
            const response = await axios.post("http://localhost:5000/api/audits", auditData);
            console.log("✅ Audit submitted successfully!", response.data);
            alert("Audit submitted successfully!");
            navigate("/dashboard");
        } catch (error) {
            console.error("❌ Error saving audit:", error.response?.data || error.message);
            setError("Failed to submit audit. Please check console for details.");
        }
    };

    return (
        <div className="container mt-4">
            <h4>Audit Review for Ticket: {ticketID}</h4>

            {/* Display loading indicator */}
            {loading && <p>Loading ticket details...</p>}

            {/* Display error message */}
            {error && <p className="text-danger">{error}</p>}

            {!loading && ticketData && (
                <div className="card p-3">
                    <h5>Assessment Criteria (1-5 Scale)</h5>
                    {Object.keys(scores).map((key) => (
                        <div key={key} className="mb-2">
                            <label>{key.replace(/([A-Z])/g, " $1").trim()}</label>
                            <input
                                type="number"
                                name={key}
                                min="1"
                                max="5"
                                className="form-control"
                                value={scores[key]}
                                onChange={handleScoreChange}
                            />
                        </div>
                    ))}

                    <h5>Overall Performance</h5>
                    <p><strong>Total Score:</strong> {totalScore}</p>
                    <p><strong>Average Score:</strong> {averageScore}</p>
                    <p><strong>Performance Rating:</strong> {performanceRating}</p>

                    <h5>Additional Comments</h5>
                    <textarea
                        name="highlights"
                        className="form-control mb-2"
                        placeholder="Highlights"
                        onChange={handleCommentChange}
                    ></textarea>
                    <textarea
                        name="improvementAreas"
                        className="form-control"
                        placeholder="Areas for Improvement"
                        onChange={handleCommentChange}
                    ></textarea>

                    <button className="btn btn-success mt-3" onClick={handleSubmit}>
                        Submit Audit
                    </button>
                </div>
            )}
        </div>
    );
};

export default AuditDetails;
