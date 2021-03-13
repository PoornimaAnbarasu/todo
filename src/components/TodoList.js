import React, { Fragment } from 'react';
import Todo from './Todo';

const TodoList = ({ todoList, onDelete, onEdit, onToggle }) => {
  return (
    <Fragment>
      {todoList.map((todo, index) => {
        return (
          <Todo
            key={index}
            todo={todo}
            onDelete={onDelete}
            onEdit={onEdit}
            onToggle={onToggle}
          />
        );
      })}
    </Fragment>
  );
};

export default TodoList;
