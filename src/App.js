import './App.css';
import * as React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/header';
import Filter from './components/filter';
import Form from './components/form';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
    }
  }
  handleSubmit = (event) => {
    event.preventDefault()
    if(event.target.todoName.value){
      this.setState(prevState => ({ 
        todos: [...prevState.todos,
          {
            input: event.target.todoName.value,
            details: event.target.details.value,
            category: event.target.categories.value || 'personal',
            done: false,
            showDetails: false,
          } ],
      }))
      setTimeout(() => {event.target.reset()},0);
      setTimeout(() => {this.setState({ value : '' })},0);
    }else {
      alert('Add todo first!')
    }
  }
  deleteTodo =(index) => {
    if(window.confirm("Are you sure you want to delete this task?")){
      let todos = [...this.state.todos]
      todos.splice(index, 1);
      this.setState({todos: todos})
    }
  }

  render(){
    return(
      <React.Fragment>
        <Header />
        <Container className="App">
          <Row>
            <Col xs={6}>
              <Form handleSubmit = {this.handleSubmit}/>
            </Col>
            <Col xs={6}>
              <Filter todos ={this.state.todos} deleteTodo ={this.deleteTodo}/> 
            </Col>  
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}
