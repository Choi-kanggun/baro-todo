import { addTodo } from "@/lib/api";
import useErrorStore from "@/store/useErrorStore";
import { Todo } from "@/types/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddTodo = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (title: string) => addTodo(title),

    onMutate: async (title: string) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const prevTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      queryClient.setQueryData<Todo[]>(["todos"], (old = []) => [
        ...old,
        {
          id: `temp-${Date.now()}`,
          title,
          completed: false,
        },
      ]);
      return { prevTodos };
    },

    onError: (_, __, context) => {
      if (context) {
        queryClient.setQueryData(["todos"], context.prevTodos);
      }
      useErrorStore
        .getState()
        .setError("할 일 추가 중 에러가 발생하였습니다. 다시 시도해주세요!");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  return createMutation;
};

export default useAddTodo;
