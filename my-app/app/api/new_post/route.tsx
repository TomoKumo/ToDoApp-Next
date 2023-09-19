import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const req = await request.json();
  await prisma.todo.create({data:req});

  return NextResponse.json(req);
}
