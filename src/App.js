import React from "react";
import TaskManagement from "./TaskManagement";
import './App.css'; // Importing the CSS file

function App() {
  return (
    <div className="App">
      <h1 className="app-heading"> Team Task Management</h1>
      <TaskManagement />
    </div>
  );
}

export default App;
