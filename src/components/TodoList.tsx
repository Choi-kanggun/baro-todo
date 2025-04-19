"use client";

import TodoItem from "@/components/TodoItem";
import { tabs } from "@/constants/tabs";
import useFetchTodos from "@/hooks/useFetchTodos";
import { Todo } from "@/types/todo";
import { useState } from "react";

const TodoList = () => {
  const [currentTab, setCurrentTab] = useState("all");
  const { todos, isPending, isError } = useFetchTodos();

  const filteredTodos = todos.filter((todo: Todo) => {
    if (currentTab === "all") return true;
    if (currentTab === "remain") return !todo.completed;
    if (currentTab === "complete") return todo.completed;
    return true;
  });

  if (isPending) {
    return <p className="text-center">로딩 중 입니다...</p>;
  }
  if (isError) {
    return (
      <p className="text-center text-red-500">
        할 일 리스트를 불러오지 못했습니다.
      </p>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-center gap-2 mb-4 flex-wrap">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.id}
            onClick={() => setCurrentTab(tab.id)}
            className={`px-4 py-2 rounded-md border transition ${
              currentTab === tab.id
                ? "bg-blue-500 border-blue-400 text-white font-semibold"
                : "bg-white border-gray-300 hover:bg-blue-400 hover:font-semibold hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <ul className="space-y-2">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
