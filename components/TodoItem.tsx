import React, { useState } from 'react';
import { TodoItemProps } from '../interfaces/Todo';

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed, onDelete, onEdit, onToggle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(text);

  const handleEdit = () => {
    onEdit(id, newText);
    setIsEditing(false);
  };

  const handleDelete = () => {
    const confirm = window.confirm(`Are you sure you want to delete task "${text}"?`);
    if (confirm) {
      onDelete(id);
    }
  }

  return (
    <div style={{ textDecoration: completed ? 'line-through' : 'none' }}>
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleEdit();
          }}
        />
      ) : (
        <span onClick={() => onToggle(id)}>{text}</span>
      )}
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TodoItem;