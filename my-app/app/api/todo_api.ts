import { todo } from '@prisma/client';

export const fetchTodos = async (): Promise<todo[]> => {
  const response = await fetch('http://localhost:3000/api/get_all');
  const todos: todo[] = await response.json();
  return todos;
};

export const handleCompleteAndDelete = async (todo_id: number, setTodos: React.Dispatch<React.SetStateAction<todo[]>>) => {
  try {
    const response = await fetch(`http://localhost:3000/api/todo/${todo_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log("削除しました");
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.todo_id !== todo_id));
    } else {
      console.error('ToDoの削除に失敗しました。');
    }
  } catch (error) {
    console.error('エラーが発生しました: ', error);
  }
};

