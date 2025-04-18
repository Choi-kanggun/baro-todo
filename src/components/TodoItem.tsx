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
    <li className="flex justify-between items-center p-2 border rounded-md shadow-sm">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="w-4 h-4"
        />
        <span className={todo.completed ? "line-through text-gray-400" : ""}>
          {todo.title}
        </span>
      </div>
      <button
        type="button"
        onClick={handleDelete}
        className="text-sm hover:text-red-600"
      >
        삭제
      </button>
    </li>
  );
};

export default TodoItem;
