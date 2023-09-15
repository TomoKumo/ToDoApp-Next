import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET( request: Request,{ params }: { params: { id: string } }) {
  const id = params.id;

  if (id) {
    const todo = await prisma.todo.findUnique({
      where: {
        todo_id: Number(id), 
      },
    });

    if (todo) {
      return NextResponse.json(todo);
    }
  }  
}

export async function POST(request: Request) {
  const req = await request.json();
  await prisma.todo.create({ data: req });

  return NextResponse.json(req);
}

export async function DELETE( request: Request,{ params }: { params: { id: string } }) {
  const id = params.id;

  await prisma.todo.delete({
    where: {
      todo_id: Number(id), 
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