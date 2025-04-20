# Todo List
#### 배포링크: [https://baro-todo.vercel.app/](https://baro-todo.vercel.app/)

### 프로젝트 개요
 - Next.js(App Router), TypeScript, Tanstack Query(react-query) 등을 활용해 투두 리스트 애플리케이션 구현

![image](https://github.com/user-attachments/assets/3298a645-dc87-4882-a1a9-ba7d6ceb80b2)

### 프로젝트 기능
 
 - Todo CRUD (생성, 읽기, 수정, 삭제) 기능
 - 완료(Completed) 상태를 별도로 확인할 수 있는 탭 기능

### 기술
1. **TypeScript**
    - 타입 안전성을 확보
2. **Next.js(App Router)**
    - 라우팅 구조 구성
3. **Tanstack Query(react-query)**
    - 서버 상태 로직 분리, 쿼리 무효화(`invalidateQueries`), 캐싱/로딩/에러 처리를 체계적으로 구현
    - prefetchQuery를 이용한 UX 개선
4. **Tailwind CSS**
    - UI 스타일링 및 반응형
5. **Zustand**
    - 수정, 완료, 토글에 대한 에러 메시지 전역 관리
5. **json-server**
    - 로컬에서 REST API 서버를 간단히 구동하기 위함

### 구조
```
📦src
 ┣ 📂app
 ┃ ┣ 📜globals.css
 ┃ ┣ 📜layout.tsx
 ┃ ┗ 📜page.tsx
 ┣ 📂components
 ┃ ┣ 📜TodoDelete.tsx
 ┃ ┣ 📜TodoEdit.tsx
 ┃ ┣ 📜TodoErrorMessage.tsx
 ┃ ┣ 📜TodoInput.tsx
 ┃ ┣ 📜TodoItem.tsx
 ┃ ┣ 📜TodoList.tsx
 ┃ ┗ 📜TodoToggle.tsx
 ┣ 📂constants
 ┃ ┣ 📜apiUrl.ts
 ┃ ┗ 📜tabs.ts
 ┣ 📂hooks
 ┃ ┣ 📜useAddTodo.ts
 ┃ ┣ 📜useDeleteTodo.ts
 ┃ ┣ 📜useFetchTodos.ts
 ┃ ┣ 📜useToggleTodo.ts
 ┃ ┗ 📜useUpdateTodo.ts
 ┣ 📂lib
 ┃ ┗ 📜api.ts
 ┣ 📂providers
 ┃ ┗ 📜TQProvider.tsx
 ┣ 📂store
 ┃ ┗ 📜useErrorStore.ts
 ┗ 📂types
 ┃ ┗ 📜todo.ts
```
