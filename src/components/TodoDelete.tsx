"use client";

import useDeleteTodo from "@/hooks/useDeleteTodo";
import { Todo } from "@/types/todo";
import { useEffect } from "react";

type Props = {
  todo: Todo;
};

const TodoDelete = ({ todo }: Props) => {
  const deleteMutation = useDeleteTodo();

  const handleDelete = () => {
    deleteMutation.mutate(todo.id);
  };

  useEffect(() => {
    if (deleteMutation.isError) {
      alert((deleteMutation.error as Error).message);
    }
  }, [deleteMutation.isError, deleteMutation.error]);

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="text-sm hover:text-red-600"
    >
      삭제
    </button>
  );
};

export default TodoDelete;
