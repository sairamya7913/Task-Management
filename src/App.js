import React, { useState } from "react";

import "./App.css";
import Modal from "./components/Modal";
import TaskColumn from "./components/TaskColumn";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const addTask = (taskText, category, tags, dueDate) => {
    const newTask = {
      id: Date.now(),
      text: taskText,
      status: "todo",
      category: category || "work",
      tags: tags || [],
      dueDate: dueDate || null,
    };
    setTasks([...tasks, newTask]);
    setIsModalOpen(false); // Close modal after adding task
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const editTask = (taskId, newText, newCategory, newTags, newDueDate) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, text: newText, category: newCategory, tags: newTags, dueDate: newDueDate }
          : task
      )
    );
  };

  return (
    <div className="App">
      <div className="create-task-container">
        <button onClick={() => setIsModalOpen(true)} className="create-task-button">
          Create Task
        </button>
      </div>

      {/* Modal for the Task Form */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TaskForm addTask={addTask} />
      </Modal>

      <div className="columns">
        <TaskColumn
          title="To Do"
          tasks={tasks.filter((task) => task.status === "todo")}
          updateTaskStatus={updateTaskStatus}
          deleteTask={deleteTask}
          editTask={editTask}
          status="todo"
        />
        <TaskColumn
          title="In Progress"
          tasks={tasks.filter((task) => task.status === "inprogress")}
          updateTaskStatus={updateTaskStatus}
          deleteTask={deleteTask}
          editTask={editTask}
          status="inprogress"
        />
        <TaskColumn
          title="Done"
          tasks={tasks.filter((task) => task.status === "done")}
          updateTaskStatus={updateTaskStatus}
          deleteTask={deleteTask}
          editTask={editTask}
          status="done"
        />
      </div>
    </div>
  );
}

export default App;
