'use client';

import { todo } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { 
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
} from '@chakra-ui/react';
import { fetchTodos } from '../../api/todo_api'; 
import { useEffect, useState } from 'react';

const Page = ({ params }: { params: { todo_id: string} }) => {
  const router = useRouter();

  const [todoToShow, setTodoToShow] = useState<todo | null>(null);
  const todo_id = params.todo_id;

  useEffect(() => {
    fetchTodos().then((data) => {
      const selectedTodo = data.find((item) => item.todo_id === Number(todo_id));
      if (selectedTodo) {
        setTodoToShow(selectedTodo);
      }
    });
  }, [todo_id, router]);

  const handleListClick = () => {
    router.push("/");
  }
  
  return (
    <Box m={6}>
      <Heading as="h1" size="lg" fontWeight="bold">
        TODO詳細
      </Heading>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>TODO</Th>
              <Th>CATEGORY</Th>
              <Th>ID</Th>
            </Tr>
          </Thead>
          <Tbody>
            {todoToShow ? (
                <Tr>
                  <Td>{todoToShow.todo_title}</Td>
                  <Td>{todoToShow.todo_category}</Td>
                  <Td>{todoToShow.todo_id}</Td>
                </Tr>
            ) : (
              <p>TODOが見つかりませんでした。</p>
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <Button colorScheme='blue' onClick={handleListClick}>
        リストに戻る
      </Button>
      
    </Box>
  );
};

export default Page;