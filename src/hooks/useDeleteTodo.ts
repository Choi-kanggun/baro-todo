import { deleteTodo } from "@/lib/api";
import useErrorStore from "@/store/useErrorStore";
import { Todo } from "@/types/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTodo(id),

    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const prevTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      queryClient.setQueryData<Todo[]>(["todos"], (old = []) =>
        old.filter((todo) => todo.id !== id)
      );
      return { prevTodos };
    },

    onError: (_, __, context) => {
      if (context) {
        queryClient.setQueryData(["todos"], context.prevTodos);
      }
      useErrorStore
        .getState()
        .setError("삭제 중 에러가 발생하였습니다. 다시 시도해주세요.");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  return deleteMutation;
};

export default useDeleteTodo;
