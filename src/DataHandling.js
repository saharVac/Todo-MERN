import Axios from 'axios'


export const addToList = (task, days) => {
    return Axios.post("https://crudmern-todo.herokuapp.com/insert", { todoName: task, daysToDo: days })
}

export const updateTodoName = (id, newTaskName) => {
    Axios.put("https://crudmern-todo.herokuapp.com/update-name", { id: id, todoName: newTaskName })
}

export const updateTodo = (id, newTaskName, newDays) => {
    return Axios.put("https://crudmern-todo.herokuapp.com/update", { id: id, todoName: newTaskName, days: newDays })
}

export const deleteTodo = (id) => {
    Axios.delete(`https://crudmern-todo.herokuapp.com/delete/${id}`)
}

// testing
export const updateTodoAndFetch = (id, newTaskName, newDays) => {
    return Axios.post("https://crudmern-todo.herokuapp.com/update-and-fetch", { id: id, todoName: newTaskName, days: newDays })
}