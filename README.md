# ToDoApp-Next
Nextを使用したTodoアプリケーションです。

##　使用言語・フレームワークなど  
Next 13.4.19  
ChakraUI 2.8.0
Prisma 5.2.0
mySQL 5.7  
Docker

## 使い方  
（ローカル）  
ターミナルでgit clone https://github.com/TomoKumo/ToDoApp-Next　　
.envを作成して　　
MYSQL_ROOT_PASSWORD=任意　　
MYSQL_DATABASE=todo　　
MYSQL_USER=任意　　
MYSQL_PASSWORD=任意　　

cd my-app　　
my-app内に存在するprismaの.envを編集　　
DATABASE_URL="mysql://root:(MYSQL_ROOT_PASSWORD)@db:3306/todo"

npm install  

cd ..
compose.yamlのある階層でdocker-compose up -d --build  
http://localhost:3000/に接続して使用可能です  


