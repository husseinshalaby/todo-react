import './App.css';
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/header';
import Filter from './components/filter';
import Form from './components/form';

export default function App () {

  const [todos, setTodos] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if(event.target.todoName.value){
      setTodos([ ...todos, {
        input: event.target.todoName.value,
        details: event.target.details.value,
        category: event.target.categories.value || 'personal',
        done: false,
        showDetails: false,
      }])
      setTimeout(() => {event.target.reset()},0);
    }else {
      alert('Add todo first!')
    }
  }

  const deleteTodo =(index) => {
    if(window.confirm("Are you sure you want to delete this task?")){
      let newArr = [...todos]
      newArr.splice(index, 1);
      setTodos(newArr)
    }
  }

  return(
    <React.Fragment>
      <Header />
      <Container className="App">
        <Row>
          <Col xs={6}>
            <Form handleSubmit = {handleSubmit}/>
          </Col>
          <Col xs={6}>
            <Filter todos ={todos} deleteTodo ={deleteTodo}/> 
          </Col>  
        </Row>
      </Container>
    </React.Fragment>
  )
}

