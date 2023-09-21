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
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  TableContainer,
  useDisclosure,
} from '@chakra-ui/react';
import { fetchCategories, fetchTodos, handleSaveChanges } from '../../api/todo_api';
import { useEffect, useState, useRef } from 'react';

const TodoEditPage = ({ params }: { params: { todo_id: string } }) => {
  type FocusableElement = any;

  const router = useRouter();

  const [todoToShow, setTodoToShow] = useState<todo | null>(null);
  const [updatedTitle, setUpdatedTitle] = useState<string>('');
  const [updatedCategory, setUpdatedCategory] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [newCategory, setNewCategory] = useState<string>('');
  const [newTodo, setNewTodo] = useState<{ todo_title: string; todo_category: string }>({
    todo_title: '',
    todo_category: '',
  });

  const todo_id = params.todo_id;

  const { isOpen: isInterruptionDialogOpen, onOpen: onInterruptionDialogOpen, onClose: onInterruptionDialogClose } = useDisclosure();
  const InterruptionDialogCancelRef = useRef<FocusableElement | null>(null);

  const handleListClick = () => {
    router.push('/');
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory); 
  
    if (selectedCategory === '新しいカテゴリ') {
      setNewTodo({
        ...newTodo,
        todo_category: newCategory,
      });
    } else {
      setNewTodo({
        ...newTodo,
        todo_category: selectedCategory,
      });
      setNewCategory('');
    }
  }; 
  useEffect(() => {
    // カテゴリ情報の取得
    fetchCategories()
      .then((categoryData) => {
        setCategories(categoryData);
      })
      .catch((error) => {
        console.error('カテゴリ情報の取得に失敗しました:', error);
      });

    // TODO情報の取得
    fetchTodos()
      .then((todoData) => {
        const selectedTodo = todoData.find((item) => item.todo_id === Number(todo_id));
        if (selectedTodo) {
          setTodoToShow(selectedTodo);
          setUpdatedTitle(selectedTodo.todo_title || '');
          setUpdatedCategory(selectedTodo.todo_category || '');
        }
      })
      .catch((error) => {
        console.error('TODO情報の取得に失敗しました:', error);
      });
  }, [todo_id]);

  return (
    <Box m={6}>
      <Heading as="h1" size="lg" fontWeight="bold">
        TODO編集
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
                <Td>
                  <Input
                    defaultValue={todoToShow.todo_title}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                  />
                </Td>
                <Td>
                <Select
                  defaultValue={todoToShow.todo_category}
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    setSelectedCategory(selectedValue);
                    
                    if (selectedValue === '新しいカテゴリ') {
                      setNewCategory(''); // 新しいカテゴリが選択された場合、newCategory をクリア
                      setNewTodo({ ...newTodo, todo_category: '' }); // todo_category をクリア
                    } else {
                      setUpdatedCategory(selectedValue);
                      setNewTodo({ ...newTodo, todo_category: selectedValue });
                    }
                  }}
                  >
                  <option value="">下記から選択してください</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                  <option value='新しいカテゴリ'>新しいカテゴリを入力する</option>
                </Select>
                {selectedCategory === '新しいカテゴリ' && (
                  <Input
                    variant='outline'
                    placeholder='新しいカテゴリを入力'
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                )}
              </Td>
                <Td>{todoToShow.todo_id}</Td>
              </Tr>
            ) : (
              <Heading>TODOが見つかりませんでした。</Heading>
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <>
        <Button colorScheme='red' onClick={onInterruptionDialogOpen}>
          リストに戻る
        </Button>

        <AlertDialog
          isOpen={isInterruptionDialogOpen}
          leastDestructiveRef={InterruptionDialogCancelRef}
          onClose={onInterruptionDialogClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                リストに戻る
              </AlertDialogHeader>

              <AlertDialogBody>
                作業を中断してTODOリストに戻りますか？
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={InterruptionDialogCancelRef} onClick={onInterruptionDialogClose}>
                  キャンセル
                </Button>
                <Button
                  colorScheme='red'
                  onClick={() => {
                    onInterruptionDialogClose();
                    handleListClick();
                  }}
                  ml={3}
                >
                  リストに戻る
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
      <Button
        colorScheme='red'
        onClick={() => {
          const updatedTodo = {
            id: Number(todo_id),
            title: updatedTitle,
            category: updatedCategory,
          };
          handleListClick();
          handleSaveChanges(updatedTodo);
        }}
        ml={3}
      >
        登録する
      </Button>
    </Box>
  );
};

export default TodoEditPage;