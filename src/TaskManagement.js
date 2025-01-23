// TaskManagement.js
import React, { useState } from "react";

function TaskManagement() {
  const [tasks, setTasks] = useState({
    todo: [
      { name: "Task 1", assignedTo: "Mohan" },
      { name: "Task 2", assignedTo: "Ram" },
    ],
    inProgress: [{ name: "Task 3", assignedTo: "Mathi" }],
    done: [{ name: "Task 4", assignedTo: "Irfan" }],
  });

  const [teamMembers] = useState(["Mohan", "Ram", "Mathi", "Irfan"]);
  const [taskInput, setTaskInput] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const handleAddTask = (column) => {
    if (!taskInput.trim() || !assignedTo) return;

    setTasks((prevTasks) => ({
      ...prevTasks,
      [column]: [...prevTasks[column], { name: taskInput, assignedTo }],
    }));

    // Reset input fields after adding the task
    setTaskInput("");
    setAssignedTo("");
  };

  const handleDeleteTask = (column, taskName) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [column]: prevTasks[column].filter((task) => task.name !== taskName),
    }));
  };

  const handleDragStart = (event, task, sourceColumn) => {
    event.dataTransfer.setData("task", JSON.stringify(task));
    event.dataTransfer.setData("sourceColumn", sourceColumn);
  };

  const handleDrop = (event, targetColumn) => {
    event.preventDefault();
    const task = JSON.parse(event.dataTransfer.getData("task"));
    const sourceColumn = event.dataTransfer.getData("sourceColumn");

    if (sourceColumn !== targetColumn) {
      setTasks((prevTasks) => {
        const updatedSource = prevTasks[sourceColumn].filter(
          (t) => t.name !== task.name
        );
        const updatedTarget = [...prevTasks[targetColumn], task];
        return {
          ...prevTasks,
          [sourceColumn]: updatedSource,
          [targetColumn]: updatedTarget,
        };
      });
    }
  };

  const allowDrop = (event) => {
    event.preventDefault();
  };

  return (
    <div className="container">
      {Object.keys(tasks).map((column) => (
        <div
          key={column}
          className="column"
          onDragOver={allowDrop}
          onDrop={(event) => handleDrop(event, column)}
        >
          <h3>{column.toUpperCase()}</h3>
          <p className="task-count">{tasks[column].length} tasks</p>
          {tasks[column].map((task) => (
            <div
              key={task.name}
              className="task"
              draggable
              onDragStart={(event) => handleDragStart(event, task, column)}
            >
              {task.name}
              <span>{task.assignedTo}</span>
              <button onClick={() => handleDeleteTask(column, task.name)}>X</button>
            </div>
          ))}
          <div className="add-task">
            <input
              type="text"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder={`Add task to ${column}`}
            />
            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            >
              <option value="">Assign to</option>
              {teamMembers.map((member) => (
                <option key={member} value={member}>
                  {member}
                </option>
              ))}
            </select>
            <button onClick={() => handleAddTask(column)}>Add</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskManagement;
