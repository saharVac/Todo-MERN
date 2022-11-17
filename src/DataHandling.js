import Axios from 'axios'


export const addToList = (task, days) => {
    return Axios.post("http://localhost:3001/insert", { todoName: task, daysToDo: days })
}

export const updateTodoName = (id, newTaskName) => {
    Axios.put("http://localhost:3001/update-name", { id: id, todoName: newTaskName })
}

export const updateTodo = (id, newTaskName, newDays) => {
    return Axios.put("http://localhost:3001/update", { id: id, todoName: newTaskName, days: newDays })
}

export const deleteTodo = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`)
}

// testing
export const updateTodoAndFetch = (id, newTaskName, newDays) => {
    return Axios.post("http://localhost:3001/update-and-fetch", { id: id, todoName: newTaskName, days: newDays })
}