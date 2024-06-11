export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface TodoItemProps {
  id: number;
  text: string;
  completed: boolean;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
  onToggle: (id: number) => void;
}
