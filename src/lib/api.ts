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

export const fetchTodos = async () => {
  try {
    const response = await fetch(API_URL, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("할 일 리스트를 가져오는데 실패하였습니다.");
    }

    const todos: Todo[] = await response.json();
    return todos;
  } catch (error) {
    throw new Error("할 일 리스트를 가져오는데 실패하였습니다.");
  }
};

export const deleteTodo = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("할 일을 삭제하는데 실패하였습니다.");
    }
  } catch (error) {
    throw new Error("할 일을 삭제하는데 실패하였습니다.");
  }
};

export const toggleTodo = async ({
  id,
  completed,
}: {
  id: string;
  completed: boolean;
}) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ completed }),
    });

    if (!response.ok) {
      throw new Error("할 일의 상태를 변경하는데 실패하였습니다.");
    }
  } catch (error) {
    throw new Error("할 일의 상태를 변경하는데 실패하였습니다.");
  }
};
