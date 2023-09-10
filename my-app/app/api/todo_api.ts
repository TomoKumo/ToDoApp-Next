import { todo } from '@prisma/client';
import { useState } from 'react';

export const fetchTodos = async (): Promise<todo[]> => {
  const response = await fetch('http://localhost:3000/api/todo');
  const todos: todo[] = await response.json();
  return todos;
};

export const handleCompleteAndDelete = async (todo_id: number) => {
  try {
    // DELETE リクエストを送信
    const response = await fetch('http://localhost:3000/api/todo', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: todo_id }),
    });

    if (response.ok) {
      console.log("削除しました")
      const [todos, setTodos] = useState<todo[]>([]); 
      const updatedTodos = todos.filter((todo: { todo_id: any; }) => todo.todo_id !== todo_id);
      setTodos(updatedTodos);

      const refreshedTodos = await fetchTodos();
      setTodos(refreshedTodos);

    } else {
      // エラーハンドリング
      console.error('ToDoの削除に失敗しました。');
    }
  } catch (error) {
    // エラーハンドリング
    console.error('エラーが発生しました: ', error);
  }
};
