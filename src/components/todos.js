import '../App.css';
import * as React from 'react';
import Todo from './todo';

const Todos = ({todos, deleteTodo, toggleDone, toggleDetails}) => {
  return (
    <ul className ='event-bubbling'>       
      { 
        todos.map((filteredTodo, index) =>  {
          const isDone = filteredTodo.done;
          return (
            <li className = {isDone ? 'child doneTodo' : 'child'} key ={index}> 
              <Todo 
                todo = {filteredTodo}
                showDetails = {filteredTodo.showDetails}
                deleteTodo ={deleteTodo}
                toggleDone ={toggleDone}
                toggleDetails = {toggleDetails}
                index = {index}
              />
            </li>
          )
        })
      }
    </ul>
  )
}

export default Todos

