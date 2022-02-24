import React from "react";
import moment from "moment";

const Todo = (props) => {
  const { todo, onChange, onEditTodo, deleteTodo} = props;
  const {id, status, name, time} = todo;
  
  return (
    <div className="todo-lists">
      <input
        type="checkbox"
        checked={status}
        onClick={() => onChange(
          {
            ...todo,
            status: !status,
          }
        )}
      />
      <span
        className={`${
          status ? "text-decoration-line-through" : "text-gray"
        }`}
      >
        {name}
      </span>
      <span
        className={`${
          status ? "text-decoration-line-through" : "text-gray"
        }`}
      >
        {moment(time).format("DD/MM/YYYY - HH:mm:ss")}
      </span>
      <div className="todo-list">
        <i
          className="fas fa-pencil-alt mx-2"
          onClick={() => onEditTodo(todo)}
        ></i>
        <i
          className="far fa-trash-alt "
          onClick={() => deleteTodo(id)}
        ></i>
      </div>
    </div>
  );
};

export default Todo;
