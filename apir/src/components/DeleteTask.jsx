import { useState } from 'react';

const TaskList = ({ tasks, deleteTask }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.title}
          <button onClick={() => deleteTask(task.id)}>Supprimer</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
