import React, { useReducer, useRef } from 'react'
import { addToList } from '../DataHandling'

const reducer = (state, action) => {
  switch (action.type) {
    case 'updateTask':
      return {
        ...state,
        task: action.payload,
      }
    case 'updateDays':
      return {
        ...state,
        days: action.payload,
      }
    default:
      throw new Error()
  }
}

function AddTodoArea({ markListUpdated }) {

  const task = useRef()
  const days = useRef()

  const [state, dispatch] = useReducer(reducer, {
    task: '',
    days: 0,
  })

  const add = () => {
    addToList(state.task, state.days).then((result) => {
      markListUpdated()
      task.current.value = ''
      days.current.value = ''
    })
  }

  return (
    <div className="addTodoArea" >

      <label>Task:</label>
      <input
        ref={task}
        type="text"
        onChange={(event) => {
          dispatch({ type: 'updateTask', payload: event.target.value })
        }}
      />

      <label>Days to do:</label>
      <input
        ref={days}
        type="number"
        onChange={(event) => {
          dispatch({ type: 'updateDays', payload: event.target.value })
        }}
      />

      <button
        onClick={add}>
        Add
        </button>

    </div>
  )
}

export default AddTodoArea