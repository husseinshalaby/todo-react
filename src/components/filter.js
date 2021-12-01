import '../App.css'; 
import React, { useEffect, useState } from 'react';
import Todos from "./todos";
import Select from './select';
import FilteringButtons from './filteringButtons';

export default function Filter (props) {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [value, setValue] = useState('');
  const [filter, setFilter] = useState('all');
  const showAll = () => { setFilter('all') }
  const showToBe = () => { setFilter('tobe') }
  const showDone = () => { setFilter('done') }

  const toggleDone = (index) => {
    let todos = [...filteredTodos]
    let newArr = todos.filter ((todo, i) => {
     if( i === index ){todo.done = !todo.done}
     return todo
    })
    setFilteredTodos(newArr)
 };

 const toggleDetails = (index) => {
   let todos = [...filteredTodos]
   let todo = {...todos[index]}
   todo.showDetails = !todo.showDetails
   if (todos.length) todos[index] = todo
   setFilteredTodos(todos)
 }
 
 const change = (event) => {
   setValue(event.target.value);
   setFilter('all')
 }
 
useEffect(() => {
  setTodos(props.todos)
},[props])

useEffect(()=> {
  let newArr = todos
  newArr = todos.filter((todo) => {
    if (value !== 'all' ){return  todo['category'].includes(value)}
    else { return todo['category']}
  })
  newArr = newArr.filter((todo)=> {
    if (filter === 'done') { return  todo['done'] }
    else if (filter === 'tobe') { return  !todo['done'] }
    else if (filter === 'all'){ return  todo }
  })
  setFilteredTodos(newArr)
},[value, todos, filter])

  return (
    <div>
      <section className="filtering">
        <div className="show-category">
          <Select 
            change = {change} 
            value = {value}
            defaultOption = {'All'}
          />
        </div>
        <FilteringButtons 
          showAll = {showAll}
          showToBe = {showToBe}
          showDone = {showDone}
          filter = {filter}
        />
      </section>
        <Todos 
          todos = {filteredTodos}
          deleteTodo = {props.deleteTodo}
          toggleDone = {toggleDone}
          toggleDetails = {toggleDetails}
        />
    </div>    
  )
}
