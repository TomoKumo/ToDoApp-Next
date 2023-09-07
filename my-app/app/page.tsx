'use client';

import { todo } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { 
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Box, 
  Button,
  Heading, 
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useDisclosure,
} from '@chakra-ui/react';
import { fetchTodos } from './api/todo_api'; 
import { useState, useEffect } from 'react';

const Page = () => {

  const router = useRouter();

  const [todos, setTodos] = useState<todo[]>([]);

  useEffect(() => {
    fetchTodos().then((data) => {
      setTodos(data);
    });
  }, []);

  return (
    <Box m={6}>
      <Heading as="h1" size="lg" fontWeight="bold">
        TODOリスト
      </Heading>
      <Button>
        新規登録
      </Button>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>TODO</Th>
              <Th>CATEGORY</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {todos.map((todo, index)=> (
              <Tr key={todo.todo_id}>
                <Td>{index + 1}</Td>
                <Td>{todo.todo_title}</Td>
                <Td>{todo.todo_category}</Td>
                <Td>
                  <Button>詳細</Button>
                  <Button>編集</Button>
                  <Button>完了</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Button>
        全削除
      </Button>
    </Box>
  );
};

export default Page;