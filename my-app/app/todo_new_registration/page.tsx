'use client';

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
  Input,
  Select
} from '@chakra-ui/react';
import { useEffect, useState, useRef } from 'react';
import { fetchCategories } from '../api/todo_api'; 

function TodoNewRegistrationPage() {
  const router = useRouter();

  type FocusableElement = any

  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // 初期値を文字列に変更
  const [newCategory, setNewCategory] = useState<string>('');
  const [showNewCategoryInput, setShowNewCategoryInput] = useState<boolean>(false);

  useEffect(() => {
    fetchCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error('カテゴリ情報の取得に失敗しました:', error);
      });
  }, []); // 空の依存リストを使用して初回のみ実行

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
  };

  const { isOpen: isInterruptionDialogOpen, onOpen: onInterruptionDialogOpen, onClose: onInterruptionDialogClose } = useDisclosure();
  const InterruptionDialogCancelRef = useRef<FocusableElement | null>(null);

  const handleListClick = () => {
    router.push("/");
  }

  return (
    <Box m={6}>
      <Heading as="h1" size="lg" fontWeight="bold">
        TODO新規登録
      </Heading>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>TODO</Th>
              <Th>CATEGORY</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                <Input variant='outline' placeholder='TO DO' />
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
                
              >
                新規登録
              </Button>
    </Box>
  );
}

export default TodoNewRegistrationPage;