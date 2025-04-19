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
    <li className="flex justify-between items-center p-2 border rounded-md shadow-sm">
      {!isUpdate ? (
        <>
          <div className="flex items-center gap-2">
            <TodoToggle todo={todo} />
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
