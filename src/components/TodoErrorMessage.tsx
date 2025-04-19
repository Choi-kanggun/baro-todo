"use client";

import useErrorStore from "@/store/useErrorStore";
import { useEffect } from "react";

const TodoErrorMessage = () => {
  const { errorMessage, clearError } = useErrorStore();

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        clearError();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  if (!errorMessage) return null;

  return (
    <div className="w-full text-center mt-2 text-red-500 text-xs">
      {errorMessage}
    </div>
  );
};

export default TodoErrorMessage;
