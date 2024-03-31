import "./App.css";
import Header from "./mycomponents/Header";
import Footer from "./mycomponents/Footer";
import Todos from "./mycomponents/Todos";
import Addtodo from "./mycomponents/addtodo";
import React, { useState, useEffect } from "react";

function App() {
  // Initialize todos from localStorage or set to an empty array
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  // State management for todos
  const [todos, setTodos] = useState(initTodo);

  // Function to delete a todo
  const onDelete = (todo) => {
    console.log("Deleting todo:", todo);
    setTodos(todos.filter((item) => item !== todo));
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  // Function to add a new todo
  const addTodo = (title, desc) => {
    console.log("Adding new todo:", title, desc);
    let sno;
    if (todos.length === 0) {
      sno = 0;
    } else {
      sno = todos[todos.length - 1].sno + 1;
    }
    const mytodo = {
      sno: sno,
      title: title,
      desc: desc,
    };
    setTodos([...todos, mytodo]);
    console.log(mytodo);
  };

  // Update localStorage on todos change using useEffect
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <Header title="TaskTracker" searchbar={false} />

      <Addtodo addTodo={addTodo} />
      <Todos todos={todos} onDelete={onDelete} />

      <Footer />
    </>
  );
}

export default App;
