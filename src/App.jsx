import React, { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");

  // Predefined users with username, password, role, and permissions
  const users = {
    admin: {
      username: "admin",
      password: "admin123",
      role: "admin",
      permissions: ["view patient data", "edit patient data", "manage users"],
    },
    patient: {
      username: "patient",
      password: "patient123",
      role: "patient",
      permissions: ["view patient data"],
    },
    doctor: {
      username: "doctor",
      password: "doctor123",
      role: "doctor",
      permissions: ["view patient data", "edit patient data"],
    },
  };

  // Authenticate user and show their permissions
  const authenticateUser = () => {
    if (!username || !password) {
      setResult("Please fill in both username and password.");
      return;
    }

    // Check if the username exists
    const user = users[username.toLowerCase()];
    if (!user) {
      setResult("User not found.");
      return;
    }

    // Check if the password matches
    if (user.password !== password) {
      setResult("Incorrect password.");
      return;
    }

    // Show user's permissions after successful login
    setResult(`Welcome ${user.username}! Your permissions are: ${user.permissions.join(", ")}`);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Hospital User Interface (RBAC)</h1>
        <div className="form-group">
          <label>Enter Username:</label>
          <input
            type="text"
            placeholder="e.g., admin, patient, doctor"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Enter Password:</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={authenticateUser}>Authenticate</button>
        <div className="result">{result}</div>
      </div>
    </div>
  );
}

export default App;
