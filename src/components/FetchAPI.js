import React, { useEffect, useState } from "react";
import { map, filter, findIndex } from "lodash";

import Footer from "./Footer";
import Todo from "./Todos";
import InputValue from "./InputValue";

function FetchApi() {
  const [todos, setTodos] = useState();
  const [editTodo, setEditTodo] = useState(null);

  const apiUrl = "https://61dc41c6591c3a0017e1a7f0.mockapi.io/todo/";

  useEffect(() => {
    fetchMenus();
  }, []);
  const fetchMenus = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(apiUrl, options);
    const _todos = await response.json();
    setTodos(_todos);
  };
  // Add todo
  const handleAdd = (item) => {
    const todo = {...item};
    const options = {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(apiUrl, options)
      .then((res) => res.json())
      .then((newValue) => {
        setTodos([...todos, newValue]);
      });
  };
  const handleUpdate = (item) => {
    const _todos = [...todos];
    const index = findIndex(todos, (todo) => todo.id === item.id);
    _todos[index] = { ...item };
    const options = {
      method: "PUT",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(apiUrl + item.id, options)
      .then((res) => res.json())
      .then(() => {
        setTodos(_todos);
      });
    setEditTodo(null);
  };
  // Edit todo
  const onEditTodo = (item) => {
    setEditTodo(item);
  };
  const onChange = (item) => {
    if (!item.id) return handleAdd(item);
    return handleUpdate(item);
  };
  //delete item
  const deleteTodo = (id) => {
    const options = {
      method: "DELETE",
    };
    fetch(apiUrl + id, options)
      .then((res) => res.json())
      .then(() => {
        const deleteItem = filter(todos, (todo) => todo.id !== id);
        setTodos(deleteItem);
      });
  };
  // Delete All
  const DeleteAll = () => {
    const options = {
      method: "DELETE",
    };
    fetch(apiUrl, options)
      .then((res) => res.json())
      .then(() => {
        setTodos([]);
      });
  };
  //total todo list
  const total = filter(todos, (todo) => !todo.status).length;

  return (
    <div>
      <h1>Todos</h1>
      <InputValue todo={editTodo} onChange={onChange} />
      <div className="mt-2">
        {map(todos, (todo, index) => (
          <Todo
            todo={todo}
            onChange={onChange}
            onEditTodo={onEditTodo}
            deleteTodo={deleteTodo}
            key={index}
          />
        ))}
      </div>
      <Footer total={total} DeleteAll={DeleteAll} />
    </div>
  );
}
export default FetchApi;
