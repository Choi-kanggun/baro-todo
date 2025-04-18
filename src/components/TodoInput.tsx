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
    <form onSubmit={handleAdd} className="w-full flex flex-col gap-2 mb-4">
      <div className="flex w-full gap-2 flex-nowrap">
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError("");
          }}
          className="flex-grow min-w-0 px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          placeholder="할 일을 입력하세요"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 font-bold text-white rounded-md hover:bg-blue-600 transition whitespace-nowrap"
        >
          추가
        </button>
      </div>

      {error && <p className="mx-auto text-xs text-red-500">{error}</p>}
    </form>
  );
};

export default TodoInput;
