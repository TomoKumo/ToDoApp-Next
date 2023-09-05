import { todo } from '@prisma/client';

const Page = async () => {
  const response = await fetch('http://localhost:3000/api/todo');
  const todos: todo[] = await response.json();

  return (
    <div className="m-4">
      <h1 className="text-lg font-bold">Todo一覧</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.todo_id}>{todo.todo_title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Page;