import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { TodoFormProps } from '../interfaces/Todo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faXmark } from '@fortawesome/free-solid-svg-icons';

const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const addTodo = () => {
    if (newTitle.trim() !== '' && newDesc.trim() !== '') {
      onAddTodo(newTitle, newDesc);
      setNewTitle('');
      setNewDesc('');
      setIsOpen(false);
    }
  };

  return (
    <div className='todo-form-popup'>
      <button onClick={() => setIsOpen(true)} className='rounded bg-[#3CDBB5] hover:bg-[#656FF0] px-4 py-2 text-white font-bold add-todo-item flex items-center gap-1'>
        <FontAwesomeIcon icon={faCirclePlus} />
        Add Todo
      </button>
      <Popup open={isOpen} closeOnDocumentClick onClose={() => setIsOpen(false)}>
        <div className="modal">
          <a className="close cursor-pointer text-white bg-[#3CDBB5] hover:bg-[#656FF0]" onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </a>
          <div>
            <input
              className='block w-full rounded-md border-0 p-1.5 mb-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              type="text"
              placeholder='Title'
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') addTodo();
              }}
            />
            <textarea 
              className='block w-full rounded-md border-0 p-1.5 mb-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              placeholder='Description'
              defaultValue={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') addTodo();
              }}
            />
            <div className='flex flex-row-reverse'>
              <button 
                className='rounded bg-[#3CDBB5] hover:bg-[#656FF0] px-4 py-2 text-white font-bold right-0 flex items-center gap-1'
                onClick={addTodo}
              >
                <FontAwesomeIcon icon={faCirclePlus} />
                Add Todo
              </button>
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default TodoForm;