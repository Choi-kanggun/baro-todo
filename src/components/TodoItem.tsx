"use client";

import useDeleteTodo from "@/hooks/useDeleteTodo";
import useToggleTodo from "@/hooks/useToggleTodo";
import { Todo } from "@/types/todo";

type TodoItemProps = {
  todo: Todo;
};

const TodoItem = ({ todo }: TodoItemProps) => {
  const deleteMutation = useDeleteTodo();
  const toggleMutation = useToggleTodo();

  const handleToggle = () => {
    toggleMutation.mutate({ id: todo.id, completed: !todo.completed });
  };

  const handleDelete = () => {
    deleteMutation.mutate(todo.id);
  };
  return (
    <div className="flex">
      <div>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
        />
        <span className={todo.completed ? "line-through text-gray-400" : ""}>
          {todo.title}
        </span>
      </div>
      <button type="button" onClick={handleDelete}>
        X
      </button>
    </div>
  );
};

export default TodoItem;
