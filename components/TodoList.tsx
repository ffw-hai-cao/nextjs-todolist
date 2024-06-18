import React, { useState, useEffect } from 'react';
import { Todo } from '../interfaces/Todo';
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

  const saveTodoList = (list: Todo[]) => {
    setTodos(list);
    localStorage.setItem('todos', JSON.stringify(list));
  }

  return (
    <div className="todo-list">
      <TodoForm onAddTodo={addTodo} />
    </div>
  );
};

export default TodoList;
