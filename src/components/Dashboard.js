import React, { useState } from "react";
import Navbar from "./Navbar";
import UploadCsv from "./UploadCsv";
import Auditing from "./Auditing";
import CallAuditing from "./CallAuditing";

const Dashboard = ({ userRole, setUserRole }) => {
    const [showAudit, setShowAudit] = useState(false);
    const [showCallAuditing, setShowCallAuditing] = useState(false);
    const [auditData, setAuditData] = useState([]); // Store uploaded CSV data

    return (
        <div>
            <Navbar 
                userRole={userRole} 
                setShowAudit={setShowAudit} 
                setShowCallAuditing={setShowCallAuditing} 
                setUserRole={setUserRole} 
            />

            {!showAudit && !showCallAuditing ? (
                <div className="container mt-4">
                    <h4 className="text-center">Welcome, {userRole === "admin" ? "Admin" : "Auditor"}</h4>
                    {userRole === "admin" && <UploadCsv setAuditData={setAuditData} />}
                </div>
            ) : showCallAuditing ? (
                <CallAuditing setShowCallAuditing={setShowCallAuditing} />
            ) : (
                <Auditing auditData={auditData} setShowAudit={setShowAudit} />
            )}
        </div>
    );
};

export default Dashboard;
