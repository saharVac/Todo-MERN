import React from 'react'

function TodoItem({ _id, updateEdited, setEditing, deleted, todoName, daysToDo }) {
    return (
        <div className='todo'>

            <h2>{todoName}</h2>

            <h2>In {daysToDo} {daysToDo === 1 ? 'day' : 'days'}</h2>

            <div>
                <button onClick={() => {
                    updateEdited({
                        todoName: todoName,
                        days: daysToDo,
                        _id: _id
                    })
                    setEditing(true)
                }} className="edit-btn">
                    Edit
                </button>

                <button onClick={() => deleted()}>
                    Delete
                </button>
            </div>

        </div>
    )
}

export default TodoItem