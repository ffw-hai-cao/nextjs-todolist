import { NextApiRequest, NextApiResponse } from 'next';

let todos: { id: number; text: string; completed: boolean }[] = [];

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    res.status(200).json(todos);
  } else if (req.method === 'POST') {
    const { text } = req.body;
    const newTodo = { id: Date.now(), text, completed: false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
  } else if (req.method === 'PUT') {
    const { id, text, completed } = req.body;
    todos = todos.map(todo => todo.id === id ? { ...todo, text, completed } : todo);
    res.status(200).json({ id, text, completed });
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    todos = todos.filter(todo => todo.id !== id);
    res.status(200).json({ id });
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};