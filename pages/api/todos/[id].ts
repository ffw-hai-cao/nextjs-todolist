import { NextApiRequest, NextApiResponse } from 'next';

let todos: { id: number; text: string; completed: boolean }[] = [];

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const todo = todos.find(todo => todo.id === parseInt(id as string));

  if (!todo) {
    res.status(404).json({ error: 'Todo not found' });
    return;
  }

  if (req.method === 'GET') {
    res.status(200).json(todo);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};