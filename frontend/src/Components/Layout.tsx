import React, { useEffect } from "react";
import TodoAdd from "./TodoAdd";
import TodoList, { TodoItem } from "./TodoList";
import { useApplicationContext } from "../Contexts/ApplicationContext";
import { GetTodoList } from "../../wailsjs/go/main/App";

const Layout = () => {
  const { setTodos } = useApplicationContext();
  const fetchTodos = async () => {
    const todoList = (await GetTodoList()) as TodoItem[];
    setTodos(todoList);
  };
  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <div className="TodoListApp">
      <section className="todo-write">
        <TodoAdd />
      </section>
      <section className="todo-display">
        <TodoList />
      </section>
    </div>
  );
};

export default Layout;
