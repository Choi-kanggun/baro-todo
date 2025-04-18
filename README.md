# Todo List

### 프로젝트 개요
 - Next.js(App Router), TypeScript, Tanstack Query(react-query) 등을 활용해 투두 리스트 애플리케이션 구현

![image](https://github.com/user-attachments/assets/3298a645-dc87-4882-a1a9-ba7d6ceb80b2)

### 기능
 
 - Todo CRUD (생성, 읽기, 수정, 삭제) 기능
 - 완료(Completed) 상태를 별도로 확인할 수 있는 탭 기능

### 구조
```
📦src
 ┣ 📂app
 ┃ ┣ 📜globals.css
 ┃ ┣ 📜layout.tsx
 ┃ ┗ 📜page.tsx
 ┣ 📂components
 ┃ ┣ 📜Loading.tsx
 ┃ ┣ 📜TodoClient.tsx
 ┃ ┣ 📜TodoFilterTabs.tsx
 ┃ ┣ 📜TodoInput.tsx
 ┃ ┣ 📜TodoItem.tsx
 ┃ ┣ 📜TodoList.tsx
 ┃ ┗ 📜TodoStatus.tsx
 ┣ 📂fonts
 ┃ ┗ 📜PretendardVariable.woff2
 ┣ 📂hooks
 ┃ ┗ 📜useTodos.ts
 ┣ 📂lib
 ┃ ┗ 📜api.ts
 ┣ 📂provides
 ┃ ┗ 📜TodoQueryProvider.tsx
 ┗ 📂types
 ┃ ┗ 📜todo.ts
```
