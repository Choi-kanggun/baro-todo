import { toggleTodo } from "@/lib/api";
import useErrorStore from "@/store/useErrorStore";
import { Todo } from "@/types/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useToggleTodo = () => {
  const queryClient = useQueryClient();

  const toggleMutation = useMutation({
    mutationFn: toggleTodo,

    onMutate: async ({ id, completed }) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const prevTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      queryClient.setQueryData<Todo[]>(["todos"], (old = []) =>
        old.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
      );
      return { prevTodos };
    },

    onError: (_, __, context) => {
      if (context) {
        queryClient.setQueryData(["todos"], context.prevTodos);
      }

      useErrorStore
        .getState()
        .setError("상태 변경 중 에러가 발생하였습니다. 다시 시도해주세요.");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  return toggleMutation;
};

export default useToggleTodo;
