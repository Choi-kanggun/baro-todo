"use client";

import useDeleteTodo from "@/hooks/useDeleteTodo";
import useToggleTodo from "@/hooks/useToggleTodo";
import useUpdateTodo from "@/hooks/useUpdateTodo";
import { Todo } from "@/types/todo";
import { useState } from "react";

type TodoItemProps = {
  todo: Todo;
};

const TodoItem = ({ todo }: TodoItemProps) => {
  const [updateTitle, setUpdateTitle] = useState(todo.title);
  const [isUpdate, setIsUpdate] = useState(false);
  const deleteMutation = useDeleteTodo();
  const toggleMutation = useToggleTodo();
  const updateMutation = useUpdateTodo();

  const handleToggle = () => {
    toggleMutation.mutate({ id: todo.id, completed: !todo.completed });
  };

  const handleUpdate = () => {
    setIsUpdate(true);
  };

  const handleUpdateComplete = (e: React.FormEvent) => {
    e.preventDefault();
    if (updateTitle.trim()) {
      updateMutation.mutate({ id: todo.id, title: updateTitle.trim() });
    }
    setIsUpdate(false);
  };

  const handleDelete = () => {
    deleteMutation.mutate(todo.id);
  };
  return (
    <li className="flex justify-between items-center p-2 border rounded-md shadow-sm">
      {!isUpdate ? (
        <>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={handleToggle}
              className="w-4 h-4"
            />
            <span
              className={`flex-grow min-w-0 ${
                todo.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {todo.title}
            </span>
          </div>
          <div className="flex whitespace-nowrap">
            <button
              type="button"
              onClick={handleUpdate}
              className="text-sm hover:text-blue-600 mx-2"
            >
              수정
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="text-sm hover:text-red-600"
            >
              삭제
            </button>
          </div>
        </>
      ) : (
        <form
          onSubmit={handleUpdateComplete}
          className="w-full flex justify-between items-center"
        >
          <input
            type="text"
            value={updateTitle}
            onChange={(e) => setUpdateTitle(e.target.value)}
            className="flex-1"
          />
          <button type="submit" className="text-sm hover:text-blue-600 mx-2">
            수정완료
          </button>
        </form>
      )}
    </li>
  );
};

export default TodoItem;
