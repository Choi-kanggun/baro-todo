import { updateTodo } from "@/lib/api";
import useErrorStore from "@/store/useErrorStore";
import { Todo } from "@/types/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updateTodo,

    onMutate: async ({ id, title }) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const prevTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      queryClient.setQueryData<Todo[]>(["todos"], (old = []) =>
        old.map((todo) => (todo.id === id ? { ...todo, title } : todo))
      );

      return { prevTodos };
    },

    onError: (_, __, context) => {
      if (context) {
        queryClient.setQueryData(["todos"], context.prevTodos);
      }

      useErrorStore
        .getState()
        .setError("수정 중 에러가 발생하였습니다. 다시 시도해주세요!");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  return updateMutation;
};

export default useUpdateTodo;
