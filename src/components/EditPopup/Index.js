import React, { useState, useRef } from 'react'
import './Style.css'
import { updateTodoAndFetch } from '../../DataHandling'

function EditPopup({ trigger, editListItem, setTrigger, editingInfo }) {

  const [didValuesChange, setdidValuesChange] = useState(false)
  const todoName = useRef()
  const days = useRef()

  const save = () => {

    updateTodoAndFetch(editingInfo._id, todoName.current.value, days.current.value).then((result) => {
      const { _id, todoName, daysToDo } = result.data
      editListItem(_id, todoName, daysToDo)
    })

    setTrigger(false)
  }

  return trigger ?
    (<div className="popup">

      <div className="popup-inner">

        <button
          className="close-btn"
          onClick={() => {
            setTrigger(false)
            setdidValuesChange(false)
          }}>
          close
        </button>

        <div className="edit-area">
          <h3>Task:</h3>

          <input
            ref={todoName}
            defaultValue={editingInfo.todoName}
            type="text"
            onChange={(event) => {
              setdidValuesChange(true)
            }}
          />

          <h3>Days to Do:</h3>
          <input
            ref={days}
            defaultValue={editingInfo.days}
            type="number"
            onChange={(event) => {
              setdidValuesChange(true)
            }}
          />

          <button className="save-btn"
            onClick={async () => {
              todoName.current.value === '' ? console.log("can't submit, task name empty") : didValuesChange ? save() : console.log("values didn't change")
            }}>
            Save
          </button>

        </div>

      </div>

    </div >)
    : ""
}

export default EditPopup