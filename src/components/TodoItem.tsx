"use client";

import useDeleteTodo from "@/hooks/useDeleteTodo";
import { Todo } from "@/types/todo";

type TodoItemProps = {
  todo: Todo;
};

const TodoItem = ({ todo }: TodoItemProps) => {
  const deleteMutation = useDeleteTodo();

  const handleDelete = () => {
    deleteMutation.mutate(todo.id);
  };
  return (
    <div>
      <span>{todo.title}</span>
      <button type="button" onClick={handleDelete}>
        X
      </button>
    </div>
  );
};

export default TodoItem;
