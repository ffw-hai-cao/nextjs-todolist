import React, { useState } from 'react';
import { TodoItemProps } from '../interfaces/Todo';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck, faFloppyDisk, faPenToSquare, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';

const TodoItem: React.FC<TodoItemProps> = ({ id, title, desc, completed, onDelete, onEdit, onToggle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDesc, setNewDesc] = useState(desc);

  const handleEdit = () => {
    onEdit(id, newTitle, newDesc);
    setIsEditing(false);
  };

  const handleDelete = () => {
    const confirm = window.confirm(`Are you sure you want to delete task "${title}"?`);
    if (confirm) {
      onDelete(id);
    }
  }

  return (
    <div className={`todo-item relative bg-white mb-4 p-4 rounded-lg hover:bg-slate-50 ${completed ? 'completed' : 'not-completed'}` }>
      {completed ? (
        <span className='mask-complete absolute top-2 right-2'>
          <FontAwesomeIcon className='fa-lg text-[#3CDBB5]' icon={faClipboardCheck} />
        </span>
      ) : (
        null
      )}

      {isEditing ? (
        <div className='edit-item pr-28'>
          <input
            className='block w-full rounded-md border-0 p-1.5 mb-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleEdit();
            }}
          />
          <textarea 
            className='block w-full rounded-md border-0 p-1.5 mb-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            placeholder='Description'
            defaultValue={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleEdit();
            }}
          />
        </div>
      ) : (
        <>
          <h2 className={`capitalize mb-2 pr-28 font-bold text-xl text-slate-900 dark:text-slate-200 ${completed ? 'line-through' : null}`}>{title}</h2>
          <div>{getFirst10Words(desc)}</div>
        </>
      )}
      <div className='todo-item-action absolute top-2 right-2 hidden flex items-center gap-2'>
        <button onClick={() => onToggle(id)}>
          <FontAwesomeIcon className={`fa-lg hover:text-[#3CDBB5] ${completed ? 'text-[#3CDBB5]' : null}`} icon={faClipboardCheck} />
        </button>
        <button onClick={isEditing ? handleEdit : () => setIsEditing(true)}>{ isEditing ? (
          <FontAwesomeIcon className='fa-lg hover:text-[#3CDBB5]' icon={faFloppyDisk} />
        ) : (
          <FontAwesomeIcon className='fa-lg hover:text-[#3CDBB5]' icon={faPenToSquare} />
        )}</button>
        <button onClick={handleDelete}>
          <FontAwesomeIcon className='fa-lg hover:text-[#3CDBB5]' icon={faTrash} />
        </button>
        <Link href={`/todo/${id}`} passHref>
          <FontAwesomeIcon className='fa-lg hover:text-[#3CDBB5]' icon={faEye} />
        </Link>
      </div>
    </div>
  );
};

function getFirst10Words(text: string) {
  let words = text.split(' ');
  if (words.length > 10) {
    return words.slice(0, 10).join(' ') + '...';
  }
  return text;
}

export default TodoItem;