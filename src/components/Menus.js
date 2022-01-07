import React, { useState } from "react";

function Menus() {
  const [job, setJob] = useState("");
  const [menus, setMenus] = useState([]);
  const [editSubmit, setEditSubmit] = useState(true);
  const [isEditSubmit, setIsEditSubmit] = useState(null);

  const handleAdd = () => {
    //   if(!job) {
        
    //   } 
    //   else{
    //     const newJob = {
    //         text: job,
    //         completed: false
    //     }
    //     setMenus([...menus].concat(newJob))
    //     setJob("");
    //   }
    if(!job) {

    } else {
        setMenus([...menus, job]);
    setJob('');
    }
    
    
  };

    const editJob = (text) => {
        console.log(text);
        const newEditJob = [...menus].find((job) => {
            return job.text === text
        });

        console.log(newEditJob);

        setEditSubmit(false);
        setJob(newEditJob.text);
        setIsEditSubmit(text);
    }
    const handleEdit = (text) => {
        // const _menus = [...menus];
        // const index = menus.findIndex((job) => job.index === item.index);
        // _menus[index] = {...item };
        // setMenus(_menus);
        // setEditSubmit(true);
        // setJob('');
        // setIsEditSubmit(null);
        // if (job && !editSubmit) {
        //     setMenus(
        //         menus.map((menu) => {
        //             if(menu.index === isEditSubmit){
        //                 return{ ...menu, text}
        //             }
        //             return menu;
        //         })
        //     )
        //     setEditSubmit(true);
        //     setJob('');
        //     setIsEditSubmit(null);
    
        //   }
    }

  const handleDelete = (index) => {
      const newMenus = [...menus];
      newMenus.splice(index, 1);
      setMenus(newMenus);
  };

  const total = menus.filter(job => !job.checked).length

  const DeleteAll = () => {
      setMenus([]);
  }

  return (
    <div>
        <h1>Todos list</h1>
      <div>
        <input
          type="text"
          value={job}
          onChange={(e) => setJob(e.target.value)}
        />
        {
            editSubmit ? <button onClick={handleAdd}>Add</button> 
                        : <button onClick={handleEdit}>Edit</button> 
        }
        
      </div>
      <ul className="list-unstyled">
        {menus.map((job, index) => (
          <li key={index} className="mt-2">
            <input 
                className="mx-2" 
                type="checkbox"
            />
            {job.text}
             
            <i 
                className="fas fa-pencil-alt mx-2 "
                onClick={() => editJob(job.text)}
            ></i>
            <i
              className="far fa-trash-alt"
              onClick={() => handleDelete(index)}
            ></i>
          </li>
        ))}
        <br />
      </ul>
      <div className="d-flex justify-content-between">
          <span>You have {total} todo list.</span>
          <button onClick={DeleteAll}>Delete all</button>
      </div>
    </div>
  );
}
export default Menus;
