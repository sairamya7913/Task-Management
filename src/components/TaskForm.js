import PropTypes from "prop-types";
import React, { useState } from "react";

function TaskForm({ addTask }) {
  /* 
   * Initialize state variables for the task form.
   * taskText: Stores the text of the task being created.
   * category: Stores the selected category for the task (default is 'work').
   * tags: Stores the tags entered for the task, as a comma-separated string.
   * dueDate: Stores the due date for the task.
   */
  const [taskText, setTaskText] = useState("");
  const [category, setCategory] = useState("work");
  const [tags, setTags] = useState("");
  const [dueDate, setDueDate] = useState("");

  /* 
   * Handle the form submission when creating a new task.
   * Prevents the default form submission behavior and checks if taskText is not empty.
   * If the task text is valid, it calls addTask and resets the form fields.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      addTask(taskText, category, tags.split(","), dueDate);
      // Reset form fields after submitting the task
      setTaskText("");
      setCategory("work");
      setTags("");
      setDueDate("");
    }
  };


  return (
    <div className="task-form-container">
      <div>
        <h3>Create Task</h3>
      </div>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Enter a new task"
        className="task-input"
      />
      <div className="select-container">
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="task-select">
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="study">Study</option>
        </select>
      </div>
      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Enter tags (comma separated)"
        className="task-tags"
      />
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="task-date" />
      <button onClick={handleSubmit} className="task-submit">
        Add Task
      </button>
    </div>
  );
}

// propType Validation
TaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default TaskForm;
