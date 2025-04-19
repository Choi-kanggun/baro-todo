"use client";

import useToggleTodo from "@/hooks/useToggleTodo";
import { Todo } from "@/types/todo";
import { useEffect } from "react";

type Props = {
  todo: Todo;
};

const TodoToggle = ({ todo }: Props) => {
  const toggleMutation = useToggleTodo();

  const handleToggle = () => {
    toggleMutation.mutate({ id: todo.id, completed: !todo.completed });
  };

  useEffect(() => {
    if (toggleMutation.isError) {
      alert((toggleMutation.error as Error).message);
    }
  }, [toggleMutation.isError, toggleMutation.error]);

  return (
    <input
      type="checkbox"
      checked={todo.completed}
      onChange={handleToggle}
      className="w-4 h-4"
    />
  );
};

export default TodoToggle;
