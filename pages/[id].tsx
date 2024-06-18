import { useRouter } from 'next/router';
import { Todo } from '../interfaces/Todo';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck, faRotateLeft, faTrash } from '@fortawesome/free-solid-svg-icons';

const TodoDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [newDesc, setNewDesc] = useState<string>('');
  const [completed, setCompleted] = useState<boolean>();

  useEffect(() => {
    if (id) {
      const storedTodos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');
      const foundTodo = storedTodos.find(todo => todo.id === parseInt(id as string));
      if (foundTodo) {
        setTodo(foundTodo || null);
        setNewTitle(foundTodo.title);
        setNewDesc(foundTodo.desc);
        setCompleted(foundTodo.completed);
        setTodos(storedTodos);
      }
    }
  }, [id]);

  const handleEditTitle = () => {
    const newList = todos.map(todo => (todo.id === parseInt(id as string) ? { ...todo, title: newTitle } : todo));
    saveTodoList(newList);
    setIsEditingTitle(false);
  };

  const handleEditDesc = () => {
    const newList = todos.map(todo => (todo.id === parseInt(id as string) ? { ...todo, desc: newDesc } : todo));
    saveTodoList(newList);
    setIsEditingDesc(false);
  };

  const handleDelete = () => {
    const confirm = window.confirm(`Are you sure you want to delete task "${newTitle}"?`);
    if (confirm) {
      const newList = todos.filter(todo => todo.id !== parseInt(id as string));
      saveTodoList(newList);
      router.push('/');
    }
  };

  const handleToggle = () => {
    setCompleted(!completed);
    const newList = todos.map(todo => (todo.id === parseInt(id as string) ? { ...todo, completed: !todo.completed } : todo));
    saveTodoList(newList);
  }

  const saveTodoList = (list: Todo[]) => {
    setTodos(list);
    localStorage.setItem('todos', JSON.stringify(list));
  }

  if (!todo) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`p-4 bg-[#ECEDF6] rounded-lg mt-4 relative ${completed ? 'completed' : 'not-completed'}` }>
      <span className='mask-complete absolute top-2 right-2 cursor-pointer' onClick={() => handleToggle(id)}>
          <FontAwesomeIcon className={`fa-lg hover:text-[#3CDBB5] ${completed ? 'text-[#3CDBB5]' : null}`} icon={faClipboardCheck} />
        </span>
      <h1 className='capitalize mb-2 pr-28 font-bold text-2xl text-slate-900 dark:text-slate-200' onClick={() => setIsEditingTitle(true)}>
      {isEditingTitle ? (
        <input
          className='block w-full rounded-md border-0 p-1.5 mb-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onBlur={handleEditTitle}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleEditTitle();
          }}
        />
      ) : (
        newTitle
      )}
      </h1>
      <div className='mb-4'>
        <label className='font-bold'>Description:</label> 
      {isEditingDesc ? (
        <textarea 
          className='block w-full rounded-md border-0 p-1.5 mb-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          placeholder='Description'
          rows={5}
          defaultValue={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
          onBlur={handleEditDesc}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleEditDesc();
          }}
          />
      ) : (
        <p onClick={() => setIsEditingDesc(true)}>{newDesc}</p>
      )}
      </div>
      <div className='todo-item-action flex items-center gap-4'>
        <button onClick={handleDelete}>
          <FontAwesomeIcon className='fa-lg hover:text-[#3CDBB5]' icon={faTrash} />
        </button>
        <Link href="/" passHref className='flex items-center gap-1 hover:text-[#3CDBB5]'>
          <FontAwesomeIcon className='fa-lg' icon={faRotateLeft} />
          Back to Todo List
        </Link>
      </div>
    </div>
  );
};

export default TodoDetailPage;