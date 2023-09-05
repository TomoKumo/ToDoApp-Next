import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const todos = await prisma.todo.findMany();
  return NextResponse.json(todos);
}

export async function POST(request: Request) {
  const req = await request.json();
  await prisma.todo.create({ data: req });

  return NextResponse.json(req);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  await prisma.todo.delete({
    where: {
      todo_id: id, 
    },
  });
  return NextResponse.json({ message: 'ToDo deleted successfully' });
}

export async function PUT(request: Request) {
  const { id, title, category } = await request.json();

  const updatedTodo = await prisma.todo.update({
    where: {
      todo_id: id,
    },
    data: {
      todo_title: title,
      todo_category: category,
    },
  });

  return NextResponse.json(updatedTodo);
}