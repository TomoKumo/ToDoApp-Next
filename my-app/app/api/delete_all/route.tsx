import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(request: Request) {
  
    if (request.method === 'DELETE') {
        try {
          await prisma.todo.deleteMany({});
          return NextResponse.json({ message: '全てのデータが削除されました' });
        } catch (error) {
          console.error('データの削除中にエラーが発生しました', error);
          return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
        }
    }
}