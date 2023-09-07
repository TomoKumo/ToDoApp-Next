import { todo } from '@prisma/client';

export const fetchTodos = async (): Promise<todo[]> => {
  const response = await fetch('http://localhost:3000/api/todo');
  const todos: todo[] = await response.json();
  return todos;
};
