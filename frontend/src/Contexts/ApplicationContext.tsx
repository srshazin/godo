import React, { ReactNode, createContext, useContext, useState } from "react";
import { TodoItem } from "../Components/TodoList";

interface ApplicationContextState {
  todos: TodoItem[];
  setTodos(value: TodoItem[]): void;
}

const ApplicationContext = createContext<ApplicationContextState | null>(null);

interface ApplicationContextProviderProps {
  children: ReactNode;
}

export const ApplicationContextProvider: React.FC<
  ApplicationContextProviderProps
> = ({ children }) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  return (
    <ApplicationContext.Provider value={{ todos, setTodos }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplicationContext = (): ApplicationContextState => {
  const context = useContext(ApplicationContext);
  if (context == null) {
    throw new Error("Call ApplicationContext Only from Inside a  Provider");
  }
  return context;
};
