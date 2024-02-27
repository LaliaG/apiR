import { useState } from 'react';

const EditTask = ({ task, onUpdate }) => {
  const [editedTask, setEditedTask] = useState(task);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleUpdate = () => {
    onUpdate(editedTask);
  };

  return (
    <div>
      <input
        type="text"
        name="title"
        value={editedTask.title}
        onChange={handleInputChange}
      />
      <button onClick={handleUpdate}>Save</button>
    </div>
  );
};

export default EditTask;
