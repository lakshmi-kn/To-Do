import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div style={{ padding: 20 }}>
      <h1>To-Do List</h1>
      <input
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
        placeholder="Enter a task"
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => deleteTask(task.id)} style={{ marginLeft: 10 }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
