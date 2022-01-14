import React, { useEffect, useState } from "react";
import { map, filter, find } from "lodash";
import moment from "moment";
// import Storage from './components/Storage';

function Fetch_API() {
  const [job, setJob] = useState("");
  const [menus, setMenus] = useState([]);
  const [editSubmit, setEditSubmit] = useState(true);
  const [isEditSubmit, setIsEditSubmit] = useState(null);

  const apiUrl = "https://61dc41c6591c3a0017e1a7f0.mockapi.io/todo/";

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((newJob) => {
        setMenus(newJob);
      });
  }, []);

  // Add todo
  const handleAdd = (id) => {
    if (!job) return null;
    if (job && !editSubmit) {
      const data = {
        name: job,
        
      };
      const options = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      };
      fetch(apiUrl, options)
        .then((res) => res.json())
        .then(() => {
          setMenus([
          ...map(menus, (menu) => {
            if (menu.id === isEditSubmit) {
              return { ...menu, name: job };
            }
            return menu;
          })
        ])
        });
        setEditSubmit(true);
      setJob("");
      setIsEditSubmit(null);
    } 
    else {
      const data = {
        name: job,
        status: false,
        time: new Date().getTime(),
      };
      const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      };
      fetch(apiUrl, options)
        .then((res) => res.json())
        .then((newJob) => {
          setMenus([...menus, newJob]);
        });
      setJob("");
    }
  };

  // Edit todo
  const editItem = (id) => {
    const updateItem = {
      method: "GET",
    };
    fetch(apiUrl + id, updateItem)
      .then((res) => res.json())
      .then(() => {
        const newEditJob = find([...menus], (menu) => {
          return menu.id === id;
        });
        console.log(newEditJob.name);

        setEditSubmit(false);
        setJob(newEditJob.name);
        setIsEditSubmit(id);
      });
  };

  //delete item
  const deleteItem = (id) => {
    const delOptons = {
      method: "DELETE",
    };
    fetch(apiUrl + id, delOptons)
      .then((res) => res.json())
      .then(() => {
        const deleteItem = filter(menus, (menu) => {
          return id !== menu.id;
        });
        setMenus(deleteItem);
      });
  };

  const DeleteAll = () => {
    setMenus([]);
  };
  //total todo list
  const total = filter(menus, (menu) => !menu.status).length;

  const onChange = (id) => {

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
          <button className="btn btn-success btn-sm" onClick={handleAdd}>
            Edit
          </button>
        )}
      </div>
      <div className="mt-2">
        {map(menus, (menu) => {
          return (
            <div className="todo-lists" key={menu.id}>
              <input
                type="checkbox"
                checked={menu.status}
                onChange={() => onChange(menu.id)}
              />
              <span
                className={`${
                  menu.status ? "text-decoration-line-through" : "text-gray"
                }`}
              >
                {menu.name}
              </span>
              <span
                className={`${
                  menu.status ? "text-decoration-line-through" : "text-gray"
                }`}
              >
                {moment(menu.time).format("DD/MM/YYYY - HH:mm:ss")}
              </span>
              <div className="todo-list">
                <i
                  className="fas fa-pencil-alt mx-2"
                  onClick={() => editItem(menu.id)}
                ></i>
                <i
                  className="far fa-trash-alt "
                  onClick={() => deleteItem(menu.id)}
                ></i>
              </div>
            </div>
          );
        })}
      </div>

      <div className="d-flex justify-content-between mt-4">
        <span>You have {total} todo not completed.</span>
        <button className="btn btn-sm btn-danger" onClick={DeleteAll}>
          Delete all
        </button>
      </div>
    </div>
  );
}
export default Fetch_API;
