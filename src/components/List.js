import React, { useEffect, useReducer } from 'react'
import AddTodoArea from './AddTodoArea'
import TodoItem from './TodoItem'
import { deleteTodo } from '../DataHandling'

function List({ todoList, deleteFromTodoList, setEditing, updateEdited, markListUpdated, clearListUpdated }) {

    return (
        <div className="list">

            <AddTodoArea markListUpdated={markListUpdated} clearListUpdated={clearListUpdated} />

            {   todoList ?
                todoList.map(({ todoName, daysToDo, _id }, key) => {
                    return <TodoItem
                        key={key}
                        _id={_id}
                        updateEdited={updateEdited}
                        todoName={todoName}
                        daysToDo={daysToDo}
                        setEditing={setEditing}
                        deleted={() => {
                            deleteTodo(_id)
                            deleteFromTodoList(_id)
                        }}
                    />
                })
                : ""
            }
        </div>

    )
}

export default List