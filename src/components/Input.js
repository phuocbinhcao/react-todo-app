import React, { useState } from "react";

function Input() {
  const [job, setJob] = useState("");
  const [menus, setMenus] = useState([
      {
          id: 1,
          name: "Todo 1",
          status: false
      },
      {
        id: 2,
        name: "Todo 2",
        status: true
    }
  ]);
  const [editSubmit, setEditSubmit] = useState(true);
  const [isEditSubmit, setIsEditSubmit] = useState(null);

  // Add todo
  const handleAdd = () => {
    if (!job) {
    } else if (job && !editSubmit) {
      setMenus(
        menus.map((menu) => {
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
      };
      setMenus([...menus, allJob]);
      setJob("");
    }
  };

  // Edit todo
  const editItem = (id) => {
    const newEditJob = [...menus].find((menu) => {
      return menu.id === id;
    });

    console.log(newEditJob);

    setEditSubmit(false);
    setJob(newEditJob.name);
    setIsEditSubmit(id);
  };

  //delete item
  const deleteItem = (index) => {
    const updateMenus = menus.filter((menu) => {
      return index !== menu.id;
    });
    setMenus(updateMenus);
  };
  //total todo lisn
  const total = menus.filter((menu) => !menu.status).length;

  // delete all
  const DeleteAll = () => {
    setMenus([]);
  };

  const onChange = (id) => {
      setMenus(
          menus.map((menu) => menu.id === id ? ({...menu,status: !menu.status}) : menu
          )
      )}

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
          <button className="btn btn-primary btn-sm" onClick={handleAdd}>Add</button>
        ) : (
          <button onClick={handleAdd}>Edit</button>
        )}
      </div>
      <div className="mt-2">
        {menus.map((menu) => {
          return (
            <div className="todo-lists" key={menu.id}>
              <input 
                type="checkbox" 
                checked={menu.status}
                onChange={() => onChange(menu.id)}
              />
              <p className={`${menu.status ? "text-decoration-line-through" : "text-gray"}`}>{menu.name}</p>
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
        <button className="btn btn-sm btn-danger" onClick={DeleteAll}>Delete all</button>
      </div>
    </div>
  );
}
export default Input;
