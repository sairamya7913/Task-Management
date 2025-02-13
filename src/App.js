import React, { useState } from "react";

import "./App.css";
import Modal from "./components/Modal";
import TaskColumn from "./components/TaskColumn";
import TaskForm from "./components/TaskForm";

function App() {
  /* 
   * Initialize state variables:
   * tasks: Stores the list of tasks.
   * isModalOpen: Controls whether the task creation modal is open or not.
   * showColumns: Controls whether task columns (board view) are displayed.
   * showRows: Controls whether task rows (list view) are displayed.
   * activeAccordion: Tracks the status of the active accordion (for expanding/collapsing).
   */
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showColumns, setShowColumns] = useState(false);
  const [showRows, setShowRows] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);


  /* 
   * Initialize the active button state.
   * Tracks which button (Board or List) is currently active.
   */
  const [activeButton, setActiveButton] = useState(null);

  /* 
   * Array of task statuses.
   * Used for rendering tasks based on their current status: "todo", "inprogress", and "done".
   */
  const taskStatuses = ["todo", "inprogress", "done"];

  /* 
   * Function to add a new task.
   * Creates a task object with a unique ID, and default values for category, tags, and due date.
   * Updates the tasks state with the new task and closes the modal.
   */
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
    setIsModalOpen(false);
  };

  /* 
   * Function to update the status of a task.
   * Takes taskId and newStatus as parameters, updates the task's status.
   */
  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)));
  };

  /* 
   * Function to delete a task.
   * Takes taskId as a parameter and removes the task from the tasks list.
   */
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  /* 
   * Function to edit an existing task.
   * Takes taskId, newText, newCategory, newTags, and newDueDate as parameters to update the task.
   */
  const editTask = (taskId, newText, newCategory, newTags, newDueDate) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, text: newText, category: newCategory, tags: newTags, dueDate: newDueDate }
          : task
      )
    );
  };

  /* 
   * Handle toggle for displaying task columns (board view).
   * Ensures only one view (columns or rows) is shown at a time.
   */
  const toggleColumns = () => {
    setShowColumns(true);
    setShowRows(false);
    setActiveButton("board");
  };

  /* 
   * Handle toggle for displaying task rows (list view).
   * Ensures only one view (columns or rows) is shown at a time.
   */
  const toggleRows = () => {
    setShowRows(true);
    setShowColumns(false);
    setActiveButton("list");
  };

  /* 
   * Function to handle accordion behavior.
   * Toggles the expansion/collapse of an accordion based on the task status.
   */
  const toggleAccordion = (status) => {
    // Toggle the accordion by setting the active accordion to the clicked status
    if (activeAccordion === status) {
      setActiveAccordion(null);
    } else {
      setActiveAccordion(status);
    }
  };

  return (
    <div className="App p-3">
      <h3 className="d-flex justify-content-start mb-5 mt-3"><i className="bi bi-columns-gap me-2"></i>Task Buddy</h3>
      {/* Button to toggle visibility of task columns */}
      <div className="d-flex justify-content-start">
        <button
          onClick={toggleColumns}
          className={`btn btn-link text-black text-decoration-none ${activeButton === "board" ? "text-decoration-underline" : ""}`}
          style={{ cursor: "pointer" }}
        >
          <i className="bi bi-columns-gap me-1"></i>
          Board
        </button>

        <button
          onClick={toggleRows}
          className={`btn btn-link text-black text-decoration-none ${activeButton === "list" ? "text-decoration-underline" : ""}`}
          style={{ cursor: "pointer" }}
        >
          <i className="bi bi-list me-1"></i>
          List
        </button>
      </div>
      <div className="d-flex justify-content-end">
        <button onClick={() => setIsModalOpen(true)} className="create-task-button border rounded-5 mt-0">
          Create Task
        </button>
      </div>

      {/* Modal for the Task Form */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TaskForm addTask={addTask} />
      </Modal>

      {/* Conditionally render the columns */}
      {showColumns && (
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
      )}

      {/* Conditionally render the tasks in rows with accordion-style behavior */}

      {showRows && taskStatuses.map((status) => (
        <div key={status} className="accordion-section">
          <h3
            className="accordion-title d-flex justify-content-between align-items-center"
            onClick={() => toggleAccordion(status)}
            style={{ cursor: "pointer", fontWeight: "bold", marginBottom: "0px" }}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
            <i
              className={`bi bi-chevron-${activeAccordion === status ? "up" : "down"}`}
              style={{ fontSize: "1.5rem" }}
            ></i>
          </h3>

          {/* Show tasks only if the current status is expanded */}
          {activeAccordion === status && (
            <div className="task-list d-flex">
              {tasks.filter((task) => task.status === status).length > 0 ? (
                tasks.filter((task) => task.status === status).map((task) => (
                  <TaskColumn
                    key={task.id}
                    title={task.text}
                    tasks={[task]}
                    updateTaskStatus={updateTaskStatus}
                    deleteTask={deleteTask}
                    editTask={editTask}
                    status={status}
                  />
                ))
              ) : (
                <p>No tasks</p>
              )}
            </div>
          )}
        </div>
      ))}

    </div>
  );
}

export default App;