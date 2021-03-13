import React from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { FiEdit } from 'react-icons/fi';
import './../App.css';
const Todo = ({ todo, onDelete, onEdit, onToggle }) => {
  return (
    <div className={`task ${todo.reminder ? 'reminder' : ''}`}>
      <div onClick={() => onToggle(todo.id)}>
        <h3 className='todo-task'>{todo.task}</h3>
        <p>{todo.todoDate} </p>
        <p>{todo.todoTime}</p>
      </div>
      <div className='icons'>
        <IoCloseCircleOutline
          className='delete-icon'
          onClick={() => onDelete(todo.id)}
        />
        <FiEdit className='edit-icon' onClick={() => onEdit(todo.id)} />
      </div>
    </div>
  );
};

export default Todo;
