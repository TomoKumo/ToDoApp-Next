import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const todos = await prisma.todo.findMany();
  return NextResponse.json(todos);
}