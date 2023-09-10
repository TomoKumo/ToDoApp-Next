'use client';

import { todo } from '@prisma/client';
import { handleCompleteAndDelete } from './api/todo_api';
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
import { useEffect, useState, useRef } from 'react';

const Page = () => {

  type FocusableElement = any

  const router = useRouter();

  const [todos, setTodos] = useState<todo[]>([]);

  useEffect(() => {
    fetchTodos().then((data) => {
      setTodos(data);
    });
  }, []);

  const handleNewRegistrationClick = () => {
    router.push("/todo_new_registration");
  }

  const handleDetailClick = (todo_id: number) => {
    router.push(`/todo_detail/${todo_id}`);
  }

  const handleEditClick = () => {
    router.push("/todo_edit");
  }

  const { isOpen: isCompleteDialogOpen, onOpen: onCompleteDialogOpen, onClose: onCompleteDialogClose } = useDisclosure();
  const completeDialogCancelRef = useRef<FocusableElement | null>(null);

  const { isOpen: isDeleteDialogOpen, onOpen: onDeleteDialogOpen, onClose: onDeleteDialogClose } = useDisclosure();
  const deleteDialogCancelRef = useRef<FocusableElement | null>(null);
  
  return (
    <Box m={6}>
      <Heading as="h1" size="lg" fontWeight="bold">
        TODOリスト
      </Heading>
      <Button onClick={handleNewRegistrationClick}>
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
                  <Button onClick={() => handleDetailClick(todo.todo_id)}>詳細</Button>
                  <Button onClick={handleEditClick}>編集</Button>
                  <>
                    <Button colorScheme='red' onClick={onCompleteDialogOpen}>
                      完了
                    </Button>

                    <AlertDialog
                      isOpen={isCompleteDialogOpen}
                      leastDestructiveRef={completeDialogCancelRef}
                      onClose={onCompleteDialogClose}
                    >
                      <AlertDialogOverlay>
                        <AlertDialogContent>
                          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            完了
                          </AlertDialogHeader>

                          <AlertDialogBody>
                            完了したためTODOを削除しますがよろしいですか？
                          </AlertDialogBody>

                          <AlertDialogFooter>
                            <Button ref={completeDialogCancelRef} onClick={onCompleteDialogClose}>
                              キャンセル
                            </Button>
                            <Button 
                              colorScheme='red' 
                              onClick={() => {
                                onCompleteDialogClose(); 
                                handleCompleteAndDelete(todo.todo_id); 
                              }}
                              ml={3}>
                                完了し削除する
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialogOverlay>
                    </AlertDialog>
                  </>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <>
      <Button colorScheme='red' onClick={onDeleteDialogOpen}>
        全削除
      </Button>

      <AlertDialog
        isOpen={isDeleteDialogOpen}
        leastDestructiveRef={deleteDialogCancelRef}
        onClose={onDeleteDialogClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              全削除
            </AlertDialogHeader>

            <AlertDialogBody>
              全てのTODOを削除しますがよろしいですか？
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={deleteDialogCancelRef} onClick={onDeleteDialogClose}>
                キャンセル
              </Button>
              <Button colorScheme='red' onClick={onDeleteDialogClose} ml={3}>
                削除
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
    </Box>
  );
};

export default Page;