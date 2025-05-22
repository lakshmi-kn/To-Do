import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Make sure this is imported

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/tasks")
      .then(response => setTasks(response.data));
  }, []);

  const addTask = () => {
    if (newTask.trim() === "") return;
    axios.post("http://localhost:8080/tasks", { title: newTask })
      .then(response => {
        setTasks([...tasks, response.data]);
        setNewTask("");
      });
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:8080/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task.id !== id)));
  };

  return (
    <div className="app-container">
      <div className="todo-card">
        <h1>To-Do List</h1>
        <div className="task-input-container">
          <input
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            placeholder="Enter a task"
          />
          <button onClick={addTask} className="add-button">Add</button>
        </div>

        <ol className="task-list">
          {tasks.map(task => (
            <li key={task.id} className="task-item">
              <span className="task-title">{task.title}</span>
              <button onClick={() => deleteTask(task.id)} className="delete-button">Delete</button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default App;
