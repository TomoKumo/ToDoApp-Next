import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    const todos = await prisma.todo.findMany();
    const categories = [...new Set(todos.map((todo) => todo.todo_category))]; 
    return NextResponse.json(categories);
  }