"use client";

import useDeleteTodo from "@/hooks/useDeleteTodo";
import { Todo } from "@/types/todo";

type Props = {
  todo: Todo;
};

const TodoDelete = ({ todo }: Props) => {
  const deleteMutation = useDeleteTodo();

  const handleDelete = () => {
    deleteMutation.mutate(todo.id);
  };

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
