import React, { useState } from 'react'

export default function NewTask({ onAddTask }) {

  const [enteredTask, setEnteredTask ] = useState('');

  function handleChange(e) {
    setEnteredTask(e.target.value);
  }

  function handleClick() {
    onAddTask(enteredTask);
    setEnteredTask(''); // Clear input after adding
  }

  return (
    <div className='flex items-center gap-4'>
      <input type="text" placeholder="New Task" className="w-64 px-2 py-1 rounded-sm bg-stone-200" 
        onChange={handleChange}
        value={enteredTask} />
      <button className="text-stone-700 hover:bg-stone-950"
        onClick={handleClick}
        disabled={!enteredTask || enteredTask.trim() === ''}>
        Add Task
      </button>
    </div>
  )
}
