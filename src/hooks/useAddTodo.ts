import { addTodo } from "@/lib/api";
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

    onError: (error, __, context) => {
      if (context) {
        queryClient.setQueryData(["todos"], context.prevTodos);
      }
      throw error;
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  return createMutation;
};

export default useAddTodo;
