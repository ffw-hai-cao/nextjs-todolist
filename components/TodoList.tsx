import React, { useState, useEffect } from 'react';
import { Todo } from '../interfaces/Todo';
import Popup from 'reactjs-popup';
import TodoItem from './TodoItem';
import Link from 'next/link';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const newItem = { id: Date.now(), text: newTodo, completed: false };
      const newList = [...todos, newItem];
      saveTodoList(newList);
      setNewTodo('');
      setIsOpen(false);
    }
  };

  const deleteTodo = (id: number) => {
    const newList = todos.filter(todo => todo.id !== id);
    saveTodoList(newList);
  };

  const editTodo = (id: number, newText: string) => {
    const newList = todos.map(todo => (todo.id === id ? { ...todo, text: newText } : todo));
    saveTodoList(newList);
  };

  const toggleTodo = (id: number) => {
    const newList = todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    saveTodoList(newList);
  };

  const saveTodoList = (list: Todo[]) => {
    setTodos(list);
    localStorage.setItem('todos', JSON.stringify(list));
  }

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Add Todo</button>
      <Popup open={isOpen} closeOnDocumentClick onClose={() => setIsOpen(false)}>
        <div className="modal">
          <a className="close" onClick={() => setIsOpen(false)}>
            &times;
          </a>
          <div>
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') addTodo();
              }}
            />
            <button onClick={addTodo}>Add Todo</button>
          </div>
        </div>
      </Popup>
      <>
        {todos.map(todo => (
          <div key={todo.id}>
          <TodoItem
            id={todo.id}
            text={todo.text}
            completed={todo.completed}
            onDelete={deleteTodo}
            onEdit={editTodo}
            onToggle={toggleTodo}
          />
          <Link href={`/${todo.id}`} passHref>View Detail</Link>
          </div>
        ))}
      </>
    </div>
  );
};

export default TodoList;

// import React, { useState, useEffect } from 'react';
// import TodoItem from './TodoItem';
// import Link from 'next/link';

// interface Todo {
//   id: number;
//   text: string;
//   completed: boolean;
// }

// const TodoList: React.FC = () => {
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [newTodo, setNewTodo] = useState('');

//   useEffect(() => {
//     fetch('/api/todos')
//       .then(res => res.json())
//       .then(data => setTodos(data));
//   }, []);

//   const addTodo = () => {
//     if (newTodo.trim() !== '') {
//       fetch('/api/todos', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ text: newTodo }),
//       })
//         .then(res => res.json())
//         .then(data => setTodos([...todos, data]));
//       setNewTodo('');
//     }
//   };

//   const deleteTodo = (id: number) => {
//     fetch('/api/todos', {
//       method: 'DELETE',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ id }),
//     })
//       .then(() => setTodos(todos.filter(todo => todo.id !== id)));
//   };

//   const editTodo = (id: number, newText: string) => {
//     fetch('/api/todos', {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ id, text: newText }),
//     })
//       .then(res => res.json())
//       .then(data => setTodos(todos.map(todo => todo.id === id ? data : todo)));
//   };

//   const toggleTodo = (id: number) => {
//     const todo = todos.find(todo => todo.id === id);
//     if (todo) {
//       fetch('/api/todos', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ id, completed: !todo.completed, text: todo.text }),
//       })
//         .then(res => res.json())
//         .then(data => setTodos(todos.map(todo => todo.id === id ? data : todo)));
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={newTodo}
//         onChange={(e) => setNewTodo(e.target.value)}
//         onKeyDown={(e) => {
//           if (e.key === 'Enter') addTodo();
//         }}
//       />
//       <button onClick={addTodo}>Add Todo</button>
//       <>
//         {todos.map(todo => (
//           <div key={todo.id}>
//             <TodoItem
//               id={todo.id}
//               text={todo.text}
//               completed={todo.completed}
//               onDelete={deleteTodo}
//               onEdit={editTodo}
//               onToggle={toggleTodo}
//             />
//             <Link href={`/${todo.id}`} passHref>View Detail</Link>
//           </div>
//         ))}
//       </>
//     </div>
//   );
// };

// export default TodoList;