import React, { useState, useEffect } from 'react';
import { Todo } from '../interfaces/Todo';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const addTodo = (title: string, desc: string) => {
    const newItem = { id: Date.now(), title, desc, completed: false };
    const newList = [...todos, newItem];
    saveTodoList(newList);
  };

  const deleteTodo = (id: number) => {
    const newList = todos.filter(todo => todo.id !== id);
    saveTodoList(newList);
  };

  const editTodo = (id: number, newTitle: string, newDesc: string) => {
    const newList = todos.map(todo => (todo.id === id ? { ...todo, title: newTitle, desc: newDesc } : todo));
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
    <div className="todo-list">
      <TodoForm onAddTodo={addTodo} />
      <div className="p-4 bg-[#ECEDF6] rounded-lg mt-4">
      {todos.map(todo => (
        <TodoItem
          id={todo.id}
          key={todo.id}
          title={todo.title}
          desc={todo.desc}
          completed={todo.completed}
          onDelete={deleteTodo}
          onEdit={editTodo}
          onToggle={toggleTodo}
        />
      ))}
      </div>
    </div>
  );
};

export default TodoList;