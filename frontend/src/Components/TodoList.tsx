import React, { useState } from "react";
import { useApplicationContext } from "../Contexts/ApplicationContext";
import { DeleteTask, MarkAsComplete } from "../../wailsjs/go/main/App";

export interface TodoItem {
  id: number;
  text: string;
  isCompleted: boolean;
}

const TodoList = () => {
  const { todos } = useApplicationContext();
  return (
    <div className="todoList-container">
      {todos &&
        todos.map((todo, index) => <TodoItem todoItem={todo} key={index} />)}
    </div>
  );
};

interface TodoListItemProps {
  todoItem: TodoItem;
}

const TodoItem: React.FC<TodoListItemProps> = ({ todoItem }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { setTodos } = useApplicationContext();
  const handleCompletion = async () => {
    const updatedTodos = await MarkAsComplete(todoItem.id);
    setTodos(updatedTodos);
  };
  const handleDeletion = async () => {
    const updatedTodos = await DeleteTask(todoItem.id);
    setTodos(updatedTodos);
  };
  return (
    <div
      className={`todoListContainer ${
        todoItem.isCompleted ? "todo-complete" : ""
      }`}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <div className="todo-left">
        <div
          className={`todo-indicator ${
            todoItem.isCompleted ? "indicator-completed" : ""
          }`}
        >
          {todoItem.isCompleted && (
            <svg
              className="completeed-task"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
            >
              <path
                d="M5 14L8.5 17.5L19 6.5"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <div className={"todo-text "}>{todoItem.text}</div>
      </div>
      {isHovered && (
        <div className="todo-actions">
          {!todoItem.isCompleted && (
            <button
              className="btn-action action-mark"
              onClick={handleCompletion}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#000000"
                fill="none"
              >
                <path
                  d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M8 12.5L10.5 15L16 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
          <button onClick={handleDeletion} className="btn-action action-remove">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              color="#000000"
              fill="none"
            >
              <path
                d="M16 12L8 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoList;
