import React, { useState } from "react";

const UploadCsv = ({ setAuditData }) => {
    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        if (!file) {
            alert("Please upload a CSV file.");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const csvData = e.target.result.split("\n").slice(1); // Skip header row
            const parsedData = csvData.map((row, index) => {
                const columns = row.split(",");
                if (columns.length < 10) return null; // Skip incomplete rows
                return {
                    auditNumber: index + 1,
                    ticketID: columns[0],
                    studentEmail: columns[4],
                    date: columns[9],
                    mobile: columns[3],
                    category: columns[7],
                    assignedTo: "",
                };
            }).filter(Boolean);

            console.log("Parsed CSV Data:", parsedData);
            setAuditData(parsedData);
        };

        reader.readAsText(file);
    };

    return (
        <div className="card">
            <div className="card-body">
                <h5>Upload CRM Ticket Data</h5>
                <input type="file" accept=".csv" className="form-control mb-3" onChange={handleFileUpload} />
            </div>
        </div>
    );
};

export default UploadCsv;
