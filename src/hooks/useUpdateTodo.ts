import { updateTodo } from "@/lib/api";
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
  return updateMutation;
};

export default useUpdateTodo;
