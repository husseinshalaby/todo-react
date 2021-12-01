import '../App.css';
import * as React from 'react';
import { Button } from 'react-bootstrap';

const Todo = ({ todo, showDetails, deleteTodo, toggleDone, toggleDetails ,index }) => {
  return (
    <div>           
      <p className = "todo-name">{todo['input']}: ({todo['category'] })</p>
      <p className = {showDetails ? 'todo-details show' : 'todo-details hide'}>
        {todo['details'] ? todo['details'] : 'No Details!'}
      </p>
      <Button onClick={()=>{deleteTodo(index)}}className = "deleteButton" variant="outline-danger">x</Button>
      <Button onClick={() => {toggleDone(index)}} className = "doneButton" variant="outline-success">√</Button>
      <Button onClick = {() => {toggleDetails(index)}} className = "showDetailsButton" variant="outline-info">+</Button>
    </div>
  )
}

export default Todo

