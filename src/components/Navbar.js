import React from "react";

const Navbar = ({ userRole, setShowAudit, setShowCallAuditing, setUserRole }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Audit Dashboard</a>
            <div className="ms-auto">
                <button className="btn btn-outline-primary me-2" onClick={() => setShowAudit(true)}>
                    Auditing
                </button>
                <button className="btn btn-outline-success me-2" onClick={() => setShowCallAuditing(true)}>
                    Call Auditing
                </button>
                <button className="btn btn-danger" onClick={() => setUserRole(null)}>
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
