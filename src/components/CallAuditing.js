import React, { useState, useEffect } from "react";
import axios from "axios"; // ✅ Import Axios

const CallAuditing = ({ setShowCallAuditing }) => {
    const [callData, setCallData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOzonetelData();
    }, []);

    const fetchOzonetelData = async () => {
        const apiKey = process.env.REACT_APP_OZONETEL_API_KEY;
        const userName = process.env.REACT_APP_OZONETEL_USERNAME;

        if (!apiKey || !userName) {
            setError("API key or username is missing!");
            setLoading(false);
            return;
        }

        // ✅ Fixed Date: Fetch calls from January 1st, 2025 (00:00:00 to 23:59:59)
        const fromDate = encodeURIComponent("2025-01-01 00:00:00");
        const toDate = encodeURIComponent("2025-01-01 23:59:59");
        const format = "json";

        const url = `https://in1-ccaas-api.ozonetel.com/cloudAgentRestAPI/index.php/CloudAgent/CloudAgentAPI/getCallLogs?api_key=${apiKey}&user_name=${userName}&from_date=${fromDate}&to_date=${toDate}&format=${format}`;

        try {
            setLoading(true);
            const response = await axios.get(url, {
                headers: { "Content-Type": "application/json" }
            });

            console.log("🔍 API Response:", response.data);

            if (response.data && response.data.message) {  
                console.log("✅ Extracted Call Logs:", response.data.message);
                setCallData(response.data.message); 
            } else {
                console.log("⚠️ No call logs found in API response");
                setCallData([]); 
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading call data...</p>;
    if (error) return <p className="text-danger">Error: {error}</p>;

    return (
        <div className="container mt-4">
            <h4 className="text-center">Call Auditing Section (Data for January 1st, 2025)</h4>

            {/* Back Button */}
            <button className="btn btn-secondary mb-3" onClick={() => setShowCallAuditing(false)}>
                Back to Dashboard
            </button>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Caller ID</th>
                        <th>Skill</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Call Duration</th>
                        <th>Duration</th>
                        <th>Type</th>
                        <th>Agent ID</th>
                        <th>Agent Phone</th>
                        <th>Agent Name</th>
                        <th>Disposition</th>
                        <th>Hangup By</th>
                        <th>Status</th>
                        <th>Audio File</th>
                        <th>Transfer Type</th>
                        <th>Customer Status</th>
                        <th>Total Handling Time</th>
                    </tr>
                </thead>
                <tbody>
                    {callData.length > 0 ? (
                        callData.map((call, index) => (
                            <tr key={index}>
                                <td>{call.CallerID || "N/A"}</td>
                                <td>{call.Skill || "N/A"}</td>
                                <td>{call.StartTime || "N/A"}</td>
                                <td>{call.EndTime || "N/A"}</td>
                                <td>{call.CallDuration || "N/A"}</td>
                                <td>{call.Duration || "N/A"}</td>
                                <td>{call.Type || "N/A"}</td>
                                <td>{call.AgentID || "N/A"}</td>
                                <td>{call.AgentPhoneNumber || "N/A"}</td>
                                <td>{call.AgentName || "N/A"}</td>
                                <td>{call.Disposition || "N/A"}</td>
                                <td>{call.HangupBy || "N/A"}</td>
                                <td>{call.Status || "N/A"}</td>
                                <td>
                                    {call.AudioFile ? (
                                        <a href={call.AudioFile} target="_blank" rel="noopener noreferrer">Play</a>
                                    ) : "N/A"}
                                </td>
                                <td>{call.TransferType || "N/A"}</td>
                                <td>{call.CustomerStatus || "N/A"}</td>
                                <td>{call.TotalHandlingTime || "N/A"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="17" className="text-center">No call data available for January 1st, 2025.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CallAuditing;
