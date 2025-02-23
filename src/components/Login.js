import React, { useState } from "react";
import "./Login.css"; // Make sure to create a CSS file for styling

const Login = ({ setUserRole }) => {
    const [activeTab, setActiveTab] = useState("auditor"); // Default to auditor
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Fixed credentials
    const credentials = {
        "admin@vdk": { password: "Vdk@9876", role: "admin" },
        "deepti_suman": { password: "auditor@1234", role: "auditor" },
        "rupesh_ranjan": { password: "auditor@2345", role: "auditor" },
        "anshika_tripathi": { password: "auditor@3456", role: "auditor" },
        "yogendra_singh": { password: "auditor@4567", role: "auditor" }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (credentials[username] && credentials[username].password === password) {
            setUserRole(credentials[username].role);
        } else {
            setError("Invalid username or password!");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                {/* Tabs for Auditor & Admin */}
                <div className="tabs">
                    <span 
                        className={activeTab === "auditor" ? "active" : ""} 
                        onClick={() => setActiveTab("auditor")}
                    >
                        Auditor
                    </span>
                    <span 
                        className={activeTab === "admin" ? "active" : ""} 
                        onClick={() => setActiveTab("admin")}
                    >
                        Admin
                    </span>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Username</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            placeholder="Enter Username" 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Enter Password" 
                            required 
                        />
                    </div>
                    {error && <p className="error-text">{error}</p>}
                    <button type="submit" className="login-btn">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
