import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const todo1 = await prisma.todo.create({
    data: {
      todo_category: 'Category1',
      todo_title: 'Task 1',
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  console.log({ todo1 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
