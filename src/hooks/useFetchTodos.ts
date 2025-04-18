import { fetchTodos } from "@/lib/api";
import { Todo } from "@/types/todo";
import { useQuery } from "@tanstack/react-query";

const useFetchTodos = () => {
  const {
    data: todos = [],
    isPending,
    isError,
  } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  return {
    todos,
    isPending,
    isError,
  };
};

export default useFetchTodos;
