// App.js
import React from "react";
import TaskManagement from "./TaskManagement";

function App() {
  return (
    <div className="App">
      <div className="header">
        <h1>Team Task Management</h1>
        <div className="header-sub">
          Organize and track tasks with ease!
        </div>
      </div>
      <TaskManagement />
    </div>
  );
}

export default App;
