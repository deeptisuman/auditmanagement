import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Auditing = ({ setShowAudit }) => {
    const navigate = useNavigate();
    const [auditData, setAuditData] = useState([]); // Store tickets from MongoDB
    const [loading, setLoading] = useState(true); // Show loading state
    const [error, setError] = useState(""); // Store error message

    // 🔹 Fetch tickets from backend when component loads
    useEffect(() => {
        axios.get("http://localhost:5000/api/tickets")
            .then(response => {
                console.log("✅ Tickets loaded:", response.data);
                setAuditData(response.data);
            })
            .catch(error => {
                console.error("❌ Error fetching tickets:", error.response?.data || error.message);
                setError("Failed to load tickets. Please try again.");
            });
    }, []);
    

    // 🔹 Filter states
    const [filters, setFilters] = useState({
        date: "",
        ticketID: "",
        studentEmail: "",
        mobile: "",
        category: ""
    });

    // 🔹 Handle filter change
    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    // 🔹 Apply filters
    const filteredData = auditData.filter((row) =>
        (!filters.date || row.date.includes(filters.date)) &&
        (!filters.ticketID || row.ticketID.includes(filters.ticketID)) &&
        (!filters.studentEmail || row.studentEmail.includes(filters.studentEmail)) &&
        (!filters.mobile || row.mobile.includes(filters.mobile)) &&
        (!filters.category || row.category.includes(filters.category))
    );

    return (
        <div className="container mt-4">
            <h4 className="text-center">Auditing Section</h4>

            {/* 🔹 Back Button */}
            <button className="btn btn-secondary mb-3" onClick={() => setShowAudit(false)}>
                Back to Dashboard
            </button>

            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Tickets for Auditing</h5>

                    {/* 🔹 Show Loading or Error Message */}
                    {loading && <p>Loading tickets...</p>}
                    {error && <p className="text-danger">{error}</p>}

                    {/* 🔹 Column Filters */}
                    <div className="row mb-3">
                        <input type="date" name="date" className="form-control col" placeholder="Filter by Date" onChange={handleFilterChange} />
                        <input type="text" name="ticketID" className="form-control col" placeholder="Filter by Ticket ID" onChange={handleFilterChange} />
                        <input type="text" name="studentEmail" className="form-control col" placeholder="Filter by Email" onChange={handleFilterChange} />
                        <input type="text" name="mobile" className="form-control col" placeholder="Filter by Mobile" onChange={handleFilterChange} />
                        <input type="text" name="category" className="form-control col" placeholder="Filter by Category" onChange={handleFilterChange} />
                    </div>

                    {/* 🔹 Tickets Table */}
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Ticket ID</th>
                                <th>Student Email</th>
                                <th>Date</th>
                                <th>Mobile</th>
                                <th>Category</th>
                                <th>Auditing Remark</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length > 0 ? (
                                filteredData.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.ticketID}</td>
                                        <td>{row.studentEmail}</td>
                                        <td>{row.date}</td>
                                        <td>{row.mobile}</td>
                                        <td>{row.category}</td>
                                        <td>
                                            <button 
                                                className="btn btn-primary btn-sm"
                                                onClick={() => navigate(`/audit-review/${row.ticketID}`)}
                                            >
                                                Audit
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        No tickets available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Auditing;
