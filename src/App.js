import './App.css';
import * as React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: [],
      value: '',
      filter: 'all',
      filteredTodos: []
    }
  }
  handleSubmit = (event) => {
    event.preventDefault()
    if(event.target.username.value){
      this.setState(prevState => ({ 
        todos: [...prevState.todos,
          {
            input: event.target.username.value,
            details: event.target.details.value,
            category: this.refs.category.value  || 'personal',
            done: false,
            showDetails: false,
            filter: 'all',
            value: 'all'
          } ],
        input: event.target.username.value,
      }))
      setTimeout(() => {event.target.reset()},0);
      setTimeout(() => {this.setState({ value : '' })},0);
    }else {
      alert('Add todo first!')
    }
  }
  deleteTodo(index){
    if(window.confirm("Are you sure you want to delete this task?")){
      let todos = [...this.state.todos]
      todos.splice(index, 1);
      this.setState({todos: todos})
    }
  }
  toggleDone = (index) => {
     let todos = [... this.state.filteredTodos]
     let newArr = todos.filter ((todo, i) => {
      if( i === index ){todo.done = !todo.done}
      return todo
     })
    this.setState({ filteredTodos : newArr });
  };

  toggleDetails = (index) => {
    let todos = [... this.state.filteredTodos]
    let todo = {... todos[index]}
    todo.showDetails = !todo.showDetails
    if (todos.length) todos[index] = todo
    this.setState({ filteredTodos : todos });
  }
  change = (event) => {
      this.setState({value: event.target.value, 
                    filter: 'all'
                  });
  }
  showAll = () => {
    this.setState({filter: 'all'});
  }
  showToBe = () => {
    this.setState({filter: 'tobe'});
  }
  showDone = () => {
    this.setState({filter: 'done'});
  }
  componentDidUpdate(prevProps, prevState) {
     let newArr = this.state.todos
    if (prevState.value !== this.state.value || prevState.filter !== this.state.filter || prevState.todos !==this.state.todos) {
      newArr =
        this.state.todos.filter((todo) =>{
          if (this.state.value !== 'all' ){return  todo['category'].includes(this.state.value)}
          else { return todo['category']}
        })
        .filter((t) => {
          const filter = this.state.filter
          if (filter === 'done') { return  t['done'] }
          else if (filter === 'tobe') { return  !t['done'] }
          else if (filter === 'all'){ return  t }
          
        })
        this.setState({filteredTodos: newArr});
      }
  }
  
  render(){
    return(
      <React.Fragment>
          <header className = 'App-header'>
            <h1>Todo App</h1>
          </header>
        <Container className="App">
          <Row>
          <Col xs={6}>
            <form onSubmit={this.handleSubmit}>
                  <input 
                  name="username" 
                  id="input" type="text" placeholder="What is in your mind ?" className="form-control input" />
                  <textarea  name = "details" className="form-control textarea" rows="3" placeholder="Todo Delatils (Optional)"></textarea>
                  <select ref="category" name="categories" className="form-select form-select-lg mb-3 select category-select" aria-label=".form-select-lg example" id="category-select" >
                      <option value="" id="default-option">Choose category</option>
                      <option value="work">Work</option>
                      <option value="study">Study</option>
                      <option value="sport">Sport</option>
                      <option value="personal">Personal</option>
                      <option value="family">Family</option>
                      <option value="friends">Friends</option>
                  </select>
                  <button 
                    id="submit" 
                    className="btn btn-primary btn-circle btn-lg button-submit"
                    type="submit"
                    >+ New Task</button>
                </form> 
          </Col>
          <Col xs={6}>
          
          <div> 
          <section className="filtering">
                   <div className="show-category">
                       <select  onChange = {this.change} value= {this.state.value}name="categories" className="form-select form-select-lg mb-3 select" aria-label=".form-select-lg example" id="category-filter" >
                           <option value="all">All</option>
                           <option value="work">Work</option>
                           <option value="study">Study</option>
                           <option value="sport">Sport</option>
                           <option value="personal">Personal</option>
                           <option value="family">Family</option>
                           <option value="friends">Friends</option>
                       </select>
                   </div>
                   <div>
                     <ul className="sorting">
                        <li>
                          <Button onClick= {() => this.showAll()}className="filter-button showAll " variant={this.state.filter === 'all' ?"primary": "outline-primary"}>Show All</Button>
                        </li>
                        <li>
                          <Button onClick= {() => this.showToBe()} variant={this.state.filter === 'tobe' ?"primary": "outline-primary"} className="filter-button toBeDone ">To Be </Button>
                        </li>
                        <li>
                          <Button onClick= {() => this.showDone()} variant={this.state.filter === 'done' ?"primary": "outline-primary"} className="filter-button done ">Done</Button>
                        </li>
                     </ul>
                </div>                
             </section>  
              <ul id="users" className ='event-bubbling'>       
               { 
                this.state.filteredTodos.map((filteredTodo, index) =>  {
                  const isDone = filteredTodo.done;
                  const showDetails = filteredTodo.showDetails
                  return (
                    <li className = {isDone ? 'child doneTodo' : 'child'} key ={index}>
                      <p className = "todo-name">{filteredTodo['input']}: ({filteredTodo['category'] })</p>
                      <p className = {showDetails ? 'todo-details show' : 'todo-details hide'}>
                        {filteredTodo['details'] ? filteredTodo['details'] : 'No Details!'}
                      </p>
                      <Button onClick={()=>{this.deleteTodo(index)}}className = "deleteButton" variant="outline-danger">x</Button>
                      <Button onClick={() => {this.toggleDone(index)}} className = "doneButton" variant="outline-success">√</Button>
                      <Button onClick = {() => {this.toggleDetails(index)}} className = "showDetailsButton" variant="outline-info">+</Button>
                    </li>
                  )
                })
              }
              </ul>
            </div>
          </Col>  
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}
