import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";
const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  }

  function handleClearTodos() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      handleAddTodo(e);
    }
  };

  return (
    <div className="container">
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <form>
        <input
          onKeyPress={handleKeyPress}
          className="input-box"
          ref={todoNameRef}
          type="text"
        />
        <button className="btn" onClick={handleAddTodo}>
          Add Todo
        </button>
        <button className="btn" onClick={handleClearTodos}>
          Clear Completed Todo
        </button>
        <div>{todos.filter((todo) => !todo.complete).length} left to do</div>
      </form>
    </div>
  );
}

export default App;
