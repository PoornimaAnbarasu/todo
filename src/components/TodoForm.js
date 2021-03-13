import React, { useState, useRef, useEffect } from 'react';

import DatePicker from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';

const TodoForm = ({ handleSubmit, handleEdit, editItem, isEdit }) => {
  const [task, setTask] = useState(editItem.task ? editItem.task : '');
  const [date, setDate] = useState(
    editItem.todoDate ? editItem.todoDate + '  ' + editItem.todoTime : ''
  );
  // new Date(editItem.todoDate).toLocaleDateString()
  const [reminder, setReminder] = useState(
    editItem.reminder ? editItem.reminder : false
  );
  const firstNameRef = useRef(null);

  useEffect(() => {
    firstNameRef.current.focus();
  });

  // disable past dates
  const yesterday = moment().subtract(1, 'day');
  const disablePastDt = (current) => {
    return current.isAfter(yesterday);
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (!task || /^\s*$/.test(task)) {
      alert('Please enter a todo');
    } else {
      let todoDate = new Date(date).toLocaleDateString();
      let todoTime = new Date(date).toLocaleTimeString();
      if (!isEdit) handleSubmit({ task, todoDate, todoTime, reminder });
      else handleEdit({ id: editItem.id, task, todoDate, todoTime, reminder });
      setTask('');
      setDate('');
      setReminder(false);
    }
  };

  return (
    <form className='add-form' onSubmit={submitForm}>
      <div className='form-control'>
        <label>Todo task</label>
        <input
          type='text'
          placeholder='Enter Todo'
          value={task}
          onChange={(e) => setTask(e.target.value)}
          ref={firstNameRef}
        />
      </div>
      <label> Day & Time</label>
      <div className='form-control'>
        <DatePicker
          isValidDate={disablePastDt}
          selected={date}
          dateFormat='MM/DD/yyyy'
          onChange={(date) => (date ? setDate(date) : '')}
          placeholder='Select Day and Time'
          value={date === 'undefined  undefined' ? '' : date}
        ></DatePicker>
      </div>
      <div className='form-control  form-control-check'>
        <label>Set Reminder</label>
        <input
          type='checkbox'
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>
      {!isEdit ? (
        <input type='submit' value='Save Todo' className='btn btn-block' />
      ) : (
        <input type='submit' value='Edit Todo' className='btn btn-block' />
      )}
    </form>
  );
};

export default TodoForm;
