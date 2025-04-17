"use client";

import useAddTodo from "@/hooks/useAddTodo";
import { useState } from "react";

const TodoInput = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const createMutation = useAddTodo();

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("할 일을 입력해주세요.");
      return;
    }
    setError("");
    createMutation.mutate(title);
    setTitle("");
  };

  return (
    <div className="flex flex-col">
      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError("");
          }}
          className="flex-1 px-3 py-2 border rounded-md"
          placeholder="할 일을 입력하세요"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          추가
        </button>
      </form>
      {error && <p className="mt-1 mx-auto text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default TodoInput;
