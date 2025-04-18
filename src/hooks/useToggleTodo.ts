import { toggleTodo } from "@/lib/api";
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
        old.map((todo) =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        )
      );
      return { prevTodos };
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(["todos"], context?.prevTodos);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  return toggleMutation;
};

export default useToggleTodo;
