import React from "react";
import PropTypes from "prop-types";

import TaskCard from "./TaskCard";

function TaskColumn({ title, tasks, updateTaskStatus, deleteTask, editTask, status }) {
  return (
    <div className="task-column">
      <h2>{title}</h2>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          updateTaskStatus={updateTaskStatus}
          deleteTask={deleteTask}
          editTask={editTask}
          status={status}
        />
      ))}
    </div>
  );
}

// PropTypes validation
TaskColumn.propTypes = {
  title: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      status: PropTypes.oneOf(["todo", "inprogress", "done"]).isRequired,
    })
  ).isRequired,
  updateTaskStatus: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  status: PropTypes.oneOf(["todo", "inprogress", "done"]).isRequired,
};

export default TaskColumn;
