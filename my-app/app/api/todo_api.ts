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

export const fetchCategories = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/get_all_category');
    if (!response.ok) {
      throw new Error('カテゴリ情報の取得に失敗しました');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('カテゴリ情報の取得にエラーが発生しました:', error);
    throw error;
  }
};

export const handleNewPost = async (newTodo: { todo_title: string; todo_category: string }, setTodos: React.Dispatch<React.SetStateAction<todo[]>>) => {
  try {
    const response = await fetch('http://localhost:3000/api/new_post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    });

    if (response.ok) {
      console.log("ToDoを作成しました");
      const createdTodo = await response.json();
      setTodos((prevTodos) => [...prevTodos, createdTodo]);
    } else {
      console.error('ToDoの作成に失敗しました。');
    }
  } catch (error) {
    console.error('エラーが発生しました: ', error);
  }
};

export const handleSaveChanges = async (updatedTodo: { id: number, title: string, category: string }) => {
  try {
    const response = await fetch(`http://localhost:3000/api/todo/${updatedTodo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTodo),
    });

    if (response.ok) {
      console.log('ToDoを更新しました');
    } else {
      console.error('ToDoの更新に失敗しました');
    }
  } catch (error) {
    console.error('ToDo更新中にエラーが発生しました: ', error);
  }
};