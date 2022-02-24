import React, { useEffect, useState } from "react";
import { map, filter, find } from "lodash";
// import moment from "moment";

import Footer from "./Footer";
import Todo from "./Todos";
// import InputValue from "./InputValue";

function FetchApi() {
  const [job, setJob] = useState("");
  const [id, setId] = useState("");
  const [menus, setMenus] = useState([]);
  const [editSubmit, setEditSubmit] = useState(true);
  const [isEditSubmit, setIsEditSubmit] = useState(null);

  const apiUrl = "https://61dc41c6591c3a0017e1a7f0.mockapi.io/todo/";
  const data = {
    name: job,
    status: false,
    time: new Date().getTime(),
  };
  const dataApi = {
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

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
    console.log("----1. data before fetch menus ", menus);
    const response = await fetch(apiUrl, options);
    const _menus = await response.json();
    console.log("----2. data after response menus ", _menus);

    setMenus(_menus);

    console.log("----3. data after call fetch menus ", menus);
  };

  // Add todo
  const handleAdd = () => {
    if (!job) return null;
    if (job) {
      const options = {
        method: "POST",
        ...dataApi,
      };
      fetch(apiUrl, options)
        .then((res) => res.json())
        .then((newJob) => {
          setMenus([...menus, newJob]);
        });
      setJob("");
    }
  };

  // Update todo
  const handleUpdate = () => {
    if (job && !editSubmit) {
      const options = {
        method: "PUT",
        body: JSON.stringify({
          name: job,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };

      fetch(apiUrl + id, options)
        .then((res) => res.json())
        .then(() => {
          setMenus(
            map(menus, (menu) => {
              if (menu.id === isEditSubmit) {
                return { ...menu, name: job };
              }
              return menu;
            })
          );
        });
      setEditSubmit(true);
      setJob("");
      
    }
  };

  // Edit todo
  const editItem = (id) => {
    const newEditJob = find([...menus], (menu) => {
      return menu.id === id;
    });
    setEditSubmit(false);
    setJob(newEditJob.name);
    setId(id);
    setIsEditSubmit(id);
  };

  //delete item
  const deleteItem = (id) => {
    const options = {
      method: "DELETE",
    };
    fetch(apiUrl + id, options)
      .then((res) => res.json())
      .then(() => {
        const deleteItem = filter(menus, (menu) => {
          return id !== menu.id;
        });
        setMenus(deleteItem);
      });
  };

  // Delete All
  const DeleteAll = () => {
    setMenus([]);
  };

  //total todo list
  const total = filter(menus, (menu) => !menu.status).length;

  // const onChange = () => {};
  const onChange = (id) => {
    setMenus(
      map(menus, (menu) =>
        menu.id === id ? { ...menu, status: !menu.status } : menu
      )
    );
  };

  return (
    <div>
      <h1>Todos list</h1>
      <div className="">
        <input
          className="todo-input"
          type="text"
          placeholder="Input your todo..."
          value={job}
          onChange={(e) => setJob(e.target.value)}
        />
        {editSubmit ? (
          <button className="btn btn-primary btn-sm" onClick={handleAdd}>
            Add
          </button>
        ) : (
          <button className="btn btn-success btn-sm" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>

      <div className="mt-2">
        {map(menus, (menu) => (
            <Todo
              key={menu.id}
              menu={menu}
              onChange={onChange}
              editItem={editItem}
              deleteItem={deleteItem}
            />
        ))}
      </div>

      <Footer total={total} DeleteAll={DeleteAll} />
    </div>
  );
}
export default FetchApi;
