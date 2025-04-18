import TodoInput from "@/components/TodoInput";
import TodoList from "@/components/TodoList";

const Home = () => {
  return (
    <div className="w-full mx-auto">
      <TodoInput />
      <TodoList />
    </div>
  );
};

export default Home;
