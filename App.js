import "./App.css";
import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  //USE Effect
  //state stuff
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  //run once when the app sta

  useEffect(() => {
    filterHandler();
    saveLocalTodos()
  }, [todos, status]);

  //Functions

  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
      default:
        setFilteredTodos(todos);
        break;
    }
  };
const saveLocalTodos = () => {
  if(localStorage.getItem('todos') === null) {
    localStorage.setItem('todos', JSON.stringify([]))
  }else {
    localStorage.setItem('todos', JSON.stringify(todos))
  }
}

const getLocalTodos = () => {
 if (localStorage.getItem("todos") === null) {
   localStorage.setItem("todos", JSON.stringify([]));
 } else {
   localStorage.setItem("todos", JSON.stringify(todos));
 }
}
  return (
    <div className="App">
      <h1 className="heading"></h1>
      <header>
        <Form
          todos={todos}
          setTodos={setTodos}
          inputText={inputText}
          setInputText={setInputText}
          setStatus={setStatus}
        />
        <TodoList
          filteredTodos={filteredTodos}
          setTodos={setTodos}
          todos={todos}
        />
      </header>
    </div>
  );
}

export default App;
