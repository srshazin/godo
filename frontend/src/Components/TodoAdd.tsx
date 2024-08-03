import React, { useState } from "react";
import { AddTodo } from "../../wailsjs/go/main/App";
import { TodoItem } from "./TodoList";
import { useApplicationContext } from "../Contexts/ApplicationContext";

const TodoAdd = () => {
  const [todoText, setTodoText] = useState("");
  const { setTodos } = useApplicationContext();
  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    const newList = (await AddTodo(todoText)) as TodoItem[];
    setTodos(newList);
    setTodoText("");
  };
  return (
    <form className="todo-form" onSubmit={(event) => handleAddTodo(event)}>
      <input
        onChange={(e) => setTodoText(e.target.value)}
        placeholder="What TODO?"
        type="text"
        value={todoText}
        className="add-todo-box"
      />
    </form>
  );
};

export default TodoAdd;
