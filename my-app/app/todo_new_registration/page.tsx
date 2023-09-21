"use client";

import { useState, useEffect, useRef } from 'react';
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
  Input,
  Select,
} from '@chakra-ui/react';
import { fetchCategories, handleNewPost } from '../api/todo_api';
import setTodos from '../page';
import { useRouter } from 'next/navigation';

function TodoNewRegistrationPage() {

  type FocusableElement = any

  const router = useRouter();
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [newCategory, setNewCategory] = useState<string>('');
  const [newTodo, setNewTodo] = useState<{ todo_title: string; todo_category: string }>({
    todo_title: '',
    todo_category: '',
  });

  useEffect(() => {
    fetchCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error('カテゴリ情報の取得に失敗しました:', error);
      });
  }, []);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory); // カテゴリを選択したら、selectedCategory を更新
  
    if (selectedCategory === '新しいカテゴリ') {
      // 新しいカテゴリの場合、newCategory をセットし、selectedCategory はそのままにする
      setNewTodo({
        ...newTodo,
        todo_category: newCategory,
      });
    } else {
      // 既存のカテゴリを選択した場合、selectedCategory をセットし、newCategory は空の文字列にする
      setNewTodo({
        ...newTodo,
        todo_category: selectedCategory,
      });
      setNewCategory(''); // 新しいカテゴリの入力欄をクリア
    }
  };  

  const { isOpen: isInterruptionDialogOpen, onOpen: onInterruptionDialogOpen, onClose: onInterruptionDialogClose } = useDisclosure();
  const InterruptionDialogCancelRef = useRef<FocusableElement | null>(null);

  const handleListClick = () => {
    router.push('/');
  };

  const handleNewTodoRegistration = async () => {
    try {
      await handleNewPost(newTodo, setTodos); 
    } catch (error) {
      console.error('エラーが発生しました: ', error);
    }
  };

  return (
    <Box m={6}>
      <Heading as="h1" size="lg" fontWeight="bold">
        TODO新規登録
      </Heading>
      <Box mt={6} mb={6}>
        <TableContainer>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th fontSize="lg">TODO</Th>
                <Th fontSize="lg">CATEGORY</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                <Input
                  variant='outline'
                  placeholder='TO DO'
                  value={newTodo.todo_title}
                  onChange={(e) =>
                    setNewTodo({
                      ...newTodo,
                      todo_title: e.target.value,
                    })
                  }
                />
                </Td>
                <Td>
                  <Select
                    placeholder='カテゴリ'
                    value={selectedCategory}
                    onChange={handleCategoryChange}
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
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <>
        <Button 
          colorScheme='telegram' 
          onClick={onInterruptionDialogOpen}
        >
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
                  colorScheme='telegram' 
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
        colorScheme='teal'
        onClick={() => {
          handleListClick();
          handleNewTodoRegistration();
        }}
        ml={3}
      >
        新規登録
      </Button>
    </Box>
  );
}

export default TodoNewRegistrationPage;
