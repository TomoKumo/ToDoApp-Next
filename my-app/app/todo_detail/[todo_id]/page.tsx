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
      <Box mt={6} mb={6}>
        <TableContainer>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th fontSize="lg">TODO</Th>
                <Th fontSize="lg">CATEGORY</Th>
                <Th fontSize="lg">ID</Th>
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
                <Heading>TODOが見つかりませんでした。</Heading>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Button 
        colorScheme='telegram' 
        onClick={handleListClick}
        mt = {6}
      >
        リストに戻る
      </Button>
    </Box>
  );
};

export default Page;