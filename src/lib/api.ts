import { Todo } from "@/types/todo";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const addTodo = async (title: string) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ title, completed: false }),
    });

    if (!response.ok) {
      throw new Error("할 일을 추가하는데 실패하였습니다.");
    }

    const newTodo: Todo = await response.json();
    return newTodo;
  } catch (error) {
    throw new Error("할 일을 추가하는데 실패하였습니다.");
  }
};
