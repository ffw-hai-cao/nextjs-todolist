import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoForm from '@/components/TodoForm';
import { TodoFormProps } from '@/interfaces/Todo';
import '@testing-library/jest-dom';

const onAddTodoMock = jest.fn();

const renderComponent = (props: Partial<TodoFormProps> = {}) => {
  const defaultProps: TodoFormProps = {
    onAddTodo: onAddTodoMock,
    ...props,
  };
  return render(<TodoForm {...defaultProps} />);
};

describe('TodoForm', () => {
  beforeEach(() => {
    onAddTodoMock.mockClear();
  });

  test('opens the popup when the "Add Todo" button is clicked', () => {
    renderComponent();
    const addButton = screen.getByText(/add todo/i);
    fireEvent.click(addButton);
    expect(screen.getByPlaceholderText(/title/i)).toBeInTheDocument();
  });

  test('closes the popup when the close button is clicked', () => {
    renderComponent();
    const addButton = screen.getByText(/add todo/i);
    fireEvent.click(addButton);
    const closeButton = screen.getByRole('button', { name: /xmark/i });
    fireEvent.click(closeButton);
    expect(screen.queryByPlaceholderText(/title/i)).not.toBeInTheDocument();
  });

  test('calls onAddTodo with the correct values', () => {
    renderComponent();
    const addButton = screen.getByText(/add todo/i);
    fireEvent.click(addButton);

    const titleInput = screen.getByPlaceholderText(/Title/i);
    const descInput = screen.getByPlaceholderText(/Description/i);
    const submitButton = screen.getByRole('button', {name: /addtodo/i});

    fireEvent.change(titleInput, { target: { value: 'New Todo' } });
    fireEvent.change(descInput, { target: { value: 'New Description' } });
    fireEvent.click(submitButton);

    expect(onAddTodoMock).toHaveBeenCalledWith('New Todo', 'New Description');
  });
});