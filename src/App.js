import React, {  useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';

import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [todoList, setTodoList] = useState([]);
  const [editItem, setEditItem] = useState({});

  //initial load of json
  useEffect(() => {
    const getTodo = async () => {
      const getTodoFromServer = await fetchAllTodo();
      
      setTodoList(getTodoFromServer);
    };
    getTodo();
  }, []);

  //Fetch all TodoList from server
  const fetchAllTodo = async () => {
    const res = await fetch('http://localhost:5000/todoList');
    const data = await res.json();
   
    return data;
  };

  //Fetch a TodoList from server
  const fetchTodo = async (id) => {
    const res = await fetch(`http://localhost:5000/todoList/${id}`);
    const data = await res.json();
    
    return data;
  };
  // Add a new Todo
  const handleSubmit = async (todoItem) => {
    const res = await fetch('http://localhost:5000/todoList', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(todoItem),
    });
    const data = await res.json();
    setTodoList([...todoList, data]);

    // let id = Math.floor(Math.random() * 10000);
    // let newTodo = { id, ...todoItem };
    // setTodoList([...todoList, newTodo]);
    setShowAddTask(false);
  };

  //Edit a TodoList
  const handleEdit = async (todoItem) => {
    const { id } = todoItem;
    const editTodoItem = await fetchTodo(id);
    const updateTodo = {
      ...editTodoItem,
      task: todoItem.task,
      todoDate: todoItem.todoDate,
      todoTime: todoItem.todoTime,
      reminder: todoItem.reminder,
    };

    const res = await fetch(`http://localhost:5000/todoList/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updateTodo),
    });
    //get data back for updating UI
    const data = await res.json();

    //ui
    setTodoList(
      todoList.map((todo, index) => {
        if (todo.id === todoItem.id) return data;
        else return todo;
      })
    );
    setShowAddTask(false);
    setEditItem({});
  };

  //Edit a Todo - fill up the form with edit data
  const editTodo = (id) => {
    
    setShowAddTask(true);
    const editSpecificItem = todoList.find((todo) => todo.id === id);

    setEditItem(editSpecificItem);
    setIsEdit(true);
  };

  //delete a todo
  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5000/todoList/${id}`, {
      method: 'DELETE',
    });
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  //Toggle Todo
  const toggleReminder = async (id) => {
    const toggleTodo = await fetchTodo(id);
    const updateToggle = { ...toggleTodo, reminder: !toggleTodo.reminder };
    const res = await fetch(`http://localhost:5000/todoList/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updateToggle),
    });
    //get data back for updating UI
    const data = await res.json();
    
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, reminder: data.reminder } : todo
      )
    );
    // setTodoList(
    //   todoList.map((todo) =>
    //     todo.id === id ? { ...todo, reminder: !todo.reminder } : todo
    //   )
    // );
  };
  return (
    <div className='container'>
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {showAddTask ? (
        <TodoForm
          handleSubmit={handleSubmit}
          handleEdit={handleEdit}
          editItem={editItem}
          isEdit={isEdit}
        />
      ) : (
        ''
      )}
      <TodoList
        todoList={todoList}
        onDelete={deleteTodo}
        onEdit={editTodo}
        onToggle={toggleReminder}
      />
    </div>
  );
};

export default App;
