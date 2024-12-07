import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [action, setAction] = useState("");
  const [result, setResult] = useState("");

  const checkPermission = async () => {
    if (!username || !action) {
      setResult("Please fill in both fields.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/check_permission", {
        username,
        action,
      });
      setResult(`Permission ${response.data.status.toUpperCase()}`);
    } catch (error) {
      setResult(error.response?.data?.error || "Permission Denied");
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>RBAC User Interface</h1>
        <div className="form-group">
          <label>Enter Username:</label>
          <input
            type="text"
            placeholder="e.g., user1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Enter Action:</label>
          <input
            type="text"
            placeholder="e.g., read"
            value={action}
            onChange={(e) => setAction(e.target.value)}
          />
        </div>
        <button onClick={checkPermission}>Check Permission</button>
        <div className="result">{result}</div>
      </div>
    </div>
  );
}

export default App;
