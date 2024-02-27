// src/components/TaskForm.js
import { useState, useEffect } from 'react';

const TaskForm = ({ addTask }) => {
  const [taskTitle, setTaskTitle] = useState('');

  // Utilise useEffect pour effectuer une action après le rendu initial
  useEffect(() => {
    console.log('Le composant TaskForm a été monté !');
  }, []);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskTitle.trim() !== '') {
      // Créez une nouvelle tâche avec le titre saisi
      const newTask = { id: Date.now(), title: taskTitle };
      addTask(newTask);
      setTaskTitle(''); // Réinitialisez le champ de saisie
    }
  };

  return (
    <form onSubmit={handleAddTask}>
      <input
        type="text"
        placeholder="Ajouter une nouvelle tâche..."
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
      />
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default TaskForm;
