import { useRouter } from 'next/router';
import { Todo } from '../interfaces/Todo';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const TodoDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState<string>('');

  useEffect(() => {
    if (id) {
      const storedTodos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');
      const foundTodo = storedTodos.find(todo => todo.id === parseInt(id as string));
      if (foundTodo) {
        setTodo(foundTodo || null);
        setNewText(foundTodo.text);
        setTodos(storedTodos);
      }
    }
  }, [id]);

  const handleEdit = () => {
    const newList = todos.map(todo => (todo.id === parseInt(id as string) ? { ...todo, text: newText } : todo));
    saveTodoList(newList);
    setIsEditing(false);
  };

  const handleDelete = () => {
    const confirm = window.confirm(`Are you sure you want to delete task "${newText}"?`);
    if (confirm) {
      const newList = todos.filter(todo => todo.id !== parseInt(id as string));
      saveTodoList(newList);
      router.push('/');
    }
  };

  const saveTodoList = (list: Todo[]) => {
    setTodos(list);
    localStorage.setItem('todos', JSON.stringify(list));
  }

  if (!todo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Task: 
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
        <span onClick={() => setIsEditing(true)}>{newText}</span>
      )}
      </h1>
      <p>ID: {todo.id}</p>
      <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
      <button onClick={handleDelete}>Delete</button>
      <Link href="/" passHref>Back to Todo List</Link>
    </div>
  );
};

export default TodoDetailPage;