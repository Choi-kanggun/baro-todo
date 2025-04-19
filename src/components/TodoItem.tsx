"use client";

import TodoDelete from "@/components/TodoDelete";
import TodoEdit from "@/components/TodoEdit";
import TodoToggle from "@/components/TodoToggle";
import { Todo } from "@/types/todo";
import { useState } from "react";

type TodoItemProps = {
  todo: Todo;
};

const TodoItem = ({ todo }: TodoItemProps) => {
  const [isUpdate, setIsUpdate] = useState(false);

  const handleUpdate = () => {
    setIsUpdate(true);
  };

  return (
    <li className="flex justify-between items-center p-3 border rounded-lg shadow-sm hover:bg-gray-50 transition">
      {!isUpdate ? (
        <>
          <div className="flex items-center gap-2">
            <TodoToggle todo={todo} />
            <span
              className={`flex-grow min-w-0 ${
                todo.completed ? "line-through text-gray-400" : "text-gray-800"
              }`}
            >
              {todo.title}
            </span>
          </div>
          <div className="flex whitespace-nowrap">
            <button
              type="button"
              onClick={handleUpdate}
              className="text-sm hover:text-blue-600 pr-1.5"
            >
              수정
            </button>

            <TodoDelete todo={todo} />
          </div>
        </>
      ) : (
        <TodoEdit todo={todo} setIsUpdate={setIsUpdate} />
      )}
    </li>
  );
};

export default TodoItem;
