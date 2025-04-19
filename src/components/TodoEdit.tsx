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
        className="flex-1"
      />
      <button type="submit" className="text-sm hover:text-blue-600">
        수정완료
      </button>
    </form>
  );
};

export default TodoEdit;
