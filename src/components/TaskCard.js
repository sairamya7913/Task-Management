import PropTypes from "prop-types";
import React, { useState } from "react";

function TaskCard({ task, updateTaskStatus, deleteTask, editTask, status }) {
  /* 
  * Initialize state variables for editing the task.
  * isEditing: Tracks whether the task is in editing mode.
  * newText: Stores the new text value for the task.
  * selectedCategory: Stores the selected category for the task.
  * newTags: Stores the new tags, joining them as a comma-separated string.
  * newDueDate: Stores the new due date for the task.
  */
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);
  const [selectedCategory, setSelectedCategory] = useState(task.category);
  const [newTags, setNewTags] = useState(task.tags ? task.tags.join(", ") : "");
  const [newDueDate, setNewDueDate] = useState(task.dueDate);

  /* 
   * Handle the task editing logic.
   * When editing is complete, the task is updated with the new values.
   */
  const handleEdit = () => {
    // Ensure newTags is split back into an array when editing
    editTask(task.id, newText, selectedCategory, newTags.split(","), newDueDate);
    setIsEditing(false);
  };

  /* 
   * Handle the task status change.
   * The new status is set based on the user’s selection.
   */
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    updateTaskStatus(task.id, newStatus);
  };


  return (
    <div className="task-card">
      {isEditing ? (
        <div>
          <input type="text" value={newText} onChange={(e) => setNewText(e.target.value)} />
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="study">Study</option>
          </select>
          <input
            type="text"
            value={newTags}
            onChange={(e) => setNewTags(e.target.value)}
            placeholder="Enter tags (comma separated)"
          />
          <input type="date" value={newDueDate} onChange={(e) => setNewDueDate(e.target.value)} />
          <button onClick={handleEdit}>Save</button>
        </div>
      ) : (
        <div>
          <p>{task.text}</p>
          <p>Category: {task.category}</p>
          <p>
            Tags: {task.tags && Array.isArray(task.tags) && task.tags.length > 0 ? task.tags.join(", ") : "No tags"}
          </p>
          <p>Due Date: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}</p>
        </div>
      )}

      {/* Prevent status update if task is done */}
      {task.status !== "done" && (
        <select value={task.status} onChange={handleStatusChange}>
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>
      )}
      {task.status !== "done" && (
        <div className="gap-3 mt-3 d-flex justify-content-center">
          <button onClick={() => deleteTask(task.id)} className="btn btn-danger">
            Delete
          </button>
          <button onClick={() => setIsEditing(true)} className="btn btn-primary">
            Edit
          </button>
        </div>
      )}
    </div>
  );
}

// propType Validation
TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  updateTaskStatus: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  status: PropTypes.oneOf(["todo", "inprogress", "done"]).isRequired,
};

export default TaskCard;
