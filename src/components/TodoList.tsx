"use client";

import TodoItem from "@/components/TodoItem";
import useFetchTodos from "@/hooks/useFetchTodos";
import { Todo } from "@/types/todo";
import { useState } from "react";

const TodoList = () => {
  const [currentTab, setCurrentTab] = useState("all");
  const { todos, isPending, isError } = useFetchTodos();

  const tabs = [
    { id: "all", label: "전체" },
    { id: "remain", label: "남은 일" },
    { id: "complete", label: "완료한 일" },
  ];

  const filteredTodos = todos.filter((todo: Todo) => {
    if (currentTab === "all") return true;
    if (currentTab === "active") return !todo.completed;
    if (currentTab === "completed") return todo.completed;
    return true;
  });

  if (isPending) {
    return <p>loading...</p>;
  }
  if (isError) {
    return <p>리스트를 불러오지 못했습니다.</p>;
  }

  return (
    <div>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setCurrentTab(tab.id)}
          className={currentTab === tab.id ? "bg-gray-300" : "bg-white"}
        >
          {tab.label}
        </button>
      ))}

      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
