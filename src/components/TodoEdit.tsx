"use client";

import useUpdateTodo from "@/hooks/useUpdateTodo";
import { Todo } from "@/types/todo";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type TodoItemProps = {
  todo: Todo;
  setIsUpdate: Dispatch<SetStateAction<boolean>>;
};

const TodoEdit = ({ todo, setIsUpdate }: TodoItemProps) => {
  const [updateTitle, setUpdateTitle] = useState(todo.title);
  const updateMutation = useUpdateTodo();

  const handleUpdateComplete = (e: React.FormEvent) => {
    e.preventDefault();
    if (updateTitle.trim()) {
      updateMutation.mutate({ id: todo.id, title: updateTitle.trim() });
    }
    setIsUpdate(false);
  };

  useEffect(() => {
    if (updateMutation.isError) {
      alert((updateMutation.error as Error).message);
    }
  }, [updateMutation.isError, updateMutation.error]);

  return (
    <form
      onSubmit={handleUpdateComplete}
      className="w-full flex justify-between items-center"
    >
      <input
        type="text"
        value={updateTitle}
        onChange={(e) => setUpdateTitle(e.target.value)}
        className="flex-grow min-w-0 px-1 py-2 border rounded-lg shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
      />
      <div className=" whitespace-nowrap">
        <button type="submit" className="pl-3 text-sm hover:text-blue-600">
          수정완료
        </button>
      </div>
    </form>
  );
};

export default TodoEdit;
