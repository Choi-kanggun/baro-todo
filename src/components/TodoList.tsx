"use client";

import useFetchTodos from "@/hooks/useFetchTodos";
import { Todo } from "@/types/todo";

const TodoList = () => {
  const { todos, isPending, isError } = useFetchTodos();

  if (isPending) {
    return <p>loading...</p>;
  }
  if (isError) {
    return <p>리스트를 불러오지 못했습니다.</p>;
  }

  return (
    <div>
      <div>{todos.map((todo: Todo) => todo.title)}</div>
    </div>
  );
};

export default TodoList;
