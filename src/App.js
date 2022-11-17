import './App.css';
import Axios from 'axios'
import Title from './components/Title';
import List from './components/List'
import EditPopup from './components/EditPopup/Index';
import { useState, useReducer, useEffect } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'markListUpdated':
      return {
        ...state,
        listUpdated: !state.listUpdated
      }
    case 'updateList':
      return {
        ...state,
        todoList: action.payload,
      }
    case 'addToList':
      return {
        ...state,
        todoList: [...state.todoList, action.payload]
      }
    default:
      throw new Error()
  }
}

function App() {

  const [editing, setEditing] = useState(false)
  const [editingInfo, setEditingInfo] = useState({
    todoName: '',
    days: 0,
    _id: ''
  })

  const [state, dispatch] = useReducer(reducer, {
    todoList: [],
    listUpdated: false
  })

  const refreshList = () => {
    Axios.get('http://localhost:3001/read').then((response) => {
      dispatch({ type: 'updateList', payload: response.data })
      console.log("list refreshed:", state.todoList)
    })
  }

  const updateTodoList = (id, newTodo) => {
    const newList = state.todoList.map(todo => {
      if (todo._id === id) {
        return { ...todo, todoName: newTodo }
      }
      return todo
    })
    dispatch({ type: 'updateList', payload: newList })
  }

  const deleteFromTodoList = (id) => {
    const newList = state.todoList.filter(todo => todo._id !== id)
    dispatch({ type: 'updateList', payload: newList })
  }

  const markListUpdated = () => {
    console.log("marking list as updated")
    dispatch({ type: 'markListUpdated' })
  }

  const editListItem = (id, taskName, days) => {
    const newList = state.todoList.map(item => {
      if (item._id === id) {
        return { _id: id, todoName: taskName, daysToDo: days }
      }
      return item
    })

    dispatch({ type: 'updateList', payload: newList })
  }

  const updateEdited = ({ todoName, days, _id }) => {
    setEditingInfo({
      todoName: todoName,
      days: days,
      _id: _id
    })
  }

  useEffect(() => {
    refreshList()
  }, [state.listUpdated])

  return (
    <div className="App">

      <Title />

      <List
        todoList={state.todoList}
        listUpdated={state.listUpdated}
        setEditing={setEditing}
        refreshList={refreshList}
        updateTodoList={updateTodoList}
        deleteFromTodoList={deleteFromTodoList}
        markListUpdated={markListUpdated}
        deleteFromTodoList={deleteFromTodoList}
        updateTodoList={updateTodoList}
        updateEdited={updateEdited}
      />

      <EditPopup
        trigger={editing}
        setTrigger={setEditing}
        editingInfo={editingInfo}
        setEditingInfo={setEditingInfo}
        markListUpdated={markListUpdated}
        editListItem={editListItem}
      />

    </div>
  );
}

export default App;
