import React, { useState, useEffect } from "react";
import ToDoIcons from "../assets/Icons/ToDoIcons";
import "./ToDoBox.css";

function ToDoBox({ mode }) {
  const defaultTodos = JSON.parse(localStorage.getItem("todos")) || [];

  const [todos, setTodos] = useState(defaultTodos);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("All");
  const [draggedTodo, setDraggedTodo] = useState(null);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const handleDragStart = (id) => {
    setDraggedTodo(id);
  };

  const handleDragEnd = (id) => {
    if (draggedTodo === id) {
      setDraggedTodo(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (id) => {
    if (draggedTodo === null) return;

    const updatedTodos = [...todos];
    const draggedIndex = updatedTodos.findIndex(
      (todo) => todo.id === draggedTodo
    );
    const droppedIndex = updatedTodos.findIndex((todo) => todo.id === id);

    const [draggedTodoItem] = updatedTodos.splice(draggedIndex, 1);
    updatedTodos.splice(droppedIndex, 0, draggedTodoItem);

    setTodos(updatedTodos);
    setDraggedTodo(null);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const incompleteTodosCount = todos.filter((todo) => !todo.completed).length;
  const filteredTodos = todos.filter((todo) => {
    if (filter === "Active") {
      return !todo.completed;
    } else if (filter === "Completed") {
      return todo.completed;
    } else {
      return true;
    }
  });

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className={`p-4  rounded-lg shadow-md w-[50vw] h-[70vh] custom-overflow mx-auto ${
          mode === "dark-mode" ? "dark" : "light"
        }`}
      >
        <div className="todo-input flex items-center mb-4">
          <input
            type="text"
            placeholder="Add a new todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={handleKeyPress}
            className={`flex-grow px-2 py-1 h-[60px] rounded-lg ${
              mode === "dark-mode"
                ? "border-2 border-gray-600 bg-gray-800"
                : "border-2 border-gray-400 bg-gray-100"
            } focus:outline-none  ${
              mode === "dark-mode"
                ? "text-white focus:border-blue-500"
                : "text-black focus:border-teal-700 "
            }`}
          />
        </div>

        <div className="todo-list">
          {filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className={`mb-1 p-3 rounded-md  ${
                mode === "dark-mode"
                  ? "bg-gray-800 text-white border-2 border-sky-500 "
                  : "bg-gray-100 border-2 border-gray-500"
              } flex items-center justify-between`}
              draggable="true"
              onDragStart={() => handleDragStart(todo.id)}
              onDragEnd={() => handleDragEnd(todo.id)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(todo.id)}
            >
              <div
                className={`custom-checkbox ${
                  todo.completed ? "completed" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                  id={`checkbox-${todo.id}`}
                  style={{
                    display: "none",
                  }}
                />

                <label
                  htmlFor={`checkbox-${todo.id}`}
                  className={`checkbox-label  ${
                    todo.completed ? "completed" : ""
                  }`}
                ></label>
              </div>
              <div
                className={`text   ${todo.completed ? "completed-text" : ""}`}
              >
                {todo.text}
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className={` text-[#494C6B]  hover:text-red-600 hover:font-bold `}
              >
                {ToDoIcons.cross}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="information w-[50vw] mx-auto flex flex-row justify-between items-center">
        <div
          className={`incomplete-count p-4 cursor-pointer rounded-lg  ${
            mode === "dark-mode"
              ? "text-gray-400 hover:text-white"
              : "text-gray-500 hover:text-black"
          }`}
        >
          {incompleteTodosCount > 0
            ? `${incompleteTodosCount} item${
                incompleteTodosCount > 1 ? "s" : ""
              } left`
            : "All items completed!"}
        </div>

        <div
          className={`filter-buttons flex justify-center items-center text-gray-500 `}
        >
          <button
            onClick={() => setFilter("All")}
            className={`mx-2 rounded-md p-2 ${
              filter === "All"
                ? mode === "dark-mode"
                  ? "bg-gray-700 text-white hover:bg-gray-800"
                  : "bg-gray-200 text-black hover:bg-gray-300"
                : "bg-transparent"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("Active")}
            className={`mx-2 rounded-md p-2 ${
              filter === "Active"
                ? mode === "dark-mode"
                  ? "bg-gray-700 text-white hover:bg-gray-800"
                  : "bg-gray-200 text-black hover:bg-gray-300"
                : "bg-transparent"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("Completed")}
            className={`mx-2 rounded-md p-2 ${
              filter === "Completed"
                ? mode === "dark-mode"
                  ? "bg-gray-700 text-white hover:bg-gray-800"
                  : "bg-gray-200 text-black hover:bg-gray-300"
                : "bg-transparent"
            }`}
          >
            Completed
          </button>
        </div>

        <div>
          <button
            onClick={clearCompleted}
            className={`ml-2 rounded-md p-2 ${
              mode === "dark-mode"
                ? " text-white hover:bg-red-700"
                : " text-black hover:bg-red-400"
            }`}
          >
            Clear Completed
          </button>
        </div>
      </div>
      <div className={`mt-3 text-gray-400`}>Drag and drop to reorder list</div>
    </div>
  );
}

export default ToDoBox;
