import React, { useEffect, useState } from "react";
import { map, filter, find } from "lodash";
import moment from "moment";
// import Storage from './components/Storage';

function Todo() {
  const [job, setJob] = useState("");
  const [menus, setMenus] = useState(() => {
    const storageJobs = JSON.parse(localStorage.getItem("menus"));
    return storageJobs ?? [];
  });
  const [editSubmit, setEditSubmit] = useState(true);
  const [isEditSubmit, setIsEditSubmit] = useState(null);

  useEffect(() => {
    localStorage.setItem("menus", JSON.stringify(menus));
  }, [menus]);

  // Add todo
  const handleAdd = () => {
    if (!job) return null;
    if (job && !editSubmit) {
      setMenus(
        map(menus, (menu) => {
          if (menu.id === isEditSubmit) {
            return { ...menu, name: job };
          }
          return menu;
        })
      );
      setEditSubmit(true);
      setJob("");
      setIsEditSubmit(null);
    } else {
      const allJob = {
        id: new Date().getTime().toString(),
        name: job,
        status: false,
        time: moment().format("DD/MM/YYYY - HH:mm:ss"),
      };
      setMenus([...menus, allJob]);
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
    setIsEditSubmit(id);
  };

  //delete item
  const deleteItem = (index) => {
    const updateMenus = filter(menus, (menu) => {
      return index !== menu.id;
    });
    setMenus(updateMenus);
  };
  //total todo list
  const total = filter(menus, (menu) => !menu.status).length;

  // delete all
  const DeleteAll = () => {
    setMenus([]);
  };

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
                {menu.name}{" "}
              </span>
              <span
                className={`${
                  menu.status ? "text-decoration-line-through" : "text-gray"
                }`}
              >
                {menu.time}
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
export default Todo;
