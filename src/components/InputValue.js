import React, { useState, useEffect } from "react";

const InputValue = (props) => {
  const { todo, onChange} = props;
  const [value, setValue] = useState("");

  useEffect(() => {
    const { name } = todo || {};
    setValue(name);
  }, [todo]);

  const onClick = () => {
    if (!value) return null;
    const { id } = todo || {};
    const _todo = {
      id: id || "",
      name: value,
      status: false,
      time: new Date().getTime(),
    };
    onChange(_todo);
    setValue("");
  }


  return (
    <div className="">
      <input
        className="todo-input"
        type="text"
        placeholder="Input your todo..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button 
        className="btn btn-primary btn-sm" 
        onClick={onClick}>{todo && todo.id ? "Update" : "Add" } 
      </button>
    </div>
  );
};

export default InputValue;
