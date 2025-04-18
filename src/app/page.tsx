import TodoInput from "@/components/TodoInput";
import TodoList from "@/components/TodoList";
import { fetchTodos } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const Home = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ["todos"], queryFn: fetchTodos });

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-xl mx-auto bg-white rounded-lg p-6 shadow-lg">
        <h1 className="text-3xl text-center font-bold mb-8">Todo List</h1>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <TodoInput />
          <TodoList />
        </HydrationBoundary>
      </div>
    </div>
  );
};

export default Home;
