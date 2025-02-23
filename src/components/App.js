import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Auditing from "./Auditing";
import CallAuditing from "./CallAuditing";
import AuditDetails from "./AuditDetails"; // Import AuditDetails page

const App = () => {
    const [userRole, setUserRole] = useState(null);
    const [showAuditing, setShowAuditing] = useState(false);
    const [showCallAuditing, setShowCallAuditing] = useState(false);

    return (
        <Router>
            <Routes>
                {/* Default route: Show Login or Dashboard */}
                <Route
                    path="/"
                    element={
                        !userRole ? (
                            <Login setUserRole={setUserRole} />
                        ) : showAuditing ? (
                            <Auditing setShowAudit={setShowAuditing} />
                        ) : showCallAuditing ? (
                            <CallAuditing setShowCallAuditing={setShowCallAuditing} />
                        ) : (
                            <Dashboard
                                userRole={userRole}
                                setUserRole={setUserRole}
                                setShowAuditing={setShowAuditing}
                                setShowCallAuditing={setShowCallAuditing}
                            />
                        )
                    }
                />

                {/* Route for detailed audit review */}
                <Route path="/audit-review/:ticketID" element={<AuditDetails />} />
            </Routes>
        </Router>
    );
};

export default App;
