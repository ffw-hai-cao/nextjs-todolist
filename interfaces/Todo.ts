export interface Todo {
  id: number;
  title: string;
  desc: string;
  completed: boolean;
}

export interface TodoFormProps {
  onAddTodo: (title: string, des: string) => void;
}

export interface TodoItemProps extends Todo {
  onDelete: (id: number) => void;
  onEdit: (id: number, newTitle: string, newDesc: string) => void;
  onToggle: (id: number) => void;
}
