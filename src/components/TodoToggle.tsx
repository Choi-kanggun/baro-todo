"use client";

import useToggleTodo from "@/hooks/useToggleTodo";
import { Todo } from "@/types/todo";

type Props = {
  todo: Todo;
};

const TodoToggle = ({ todo }: Props) => {
  const toggleMutation = useToggleTodo();

  const handleToggle = () => {
    toggleMutation.mutate({ id: todo.id, completed: !todo.completed });
  };

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
