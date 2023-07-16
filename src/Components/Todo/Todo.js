import React from "react";

import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import "./todo.css";

const Todo = ({ todos }) => {

  
  return (
    
      <div className="single_todo" >
        <div className="options">
          <AiOutlineDelete />
        </div>
        <div className="todo_text">
          <p>{todos.title}</p>
        </div>
      </div>
    
  );
};

export default Todo;
