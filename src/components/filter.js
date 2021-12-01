import '../App.css';
import * as React from 'react';
import Todos from "./todos";
import Select from './select';
import FilteringButtons from './filteringButtons';

class Filter extends  React.Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: [],
      value: '',
      filter: 'all',
      filteredTodos: []
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
    if(prevProps.todos != this.props.todos){
      this.setState({ todos : this.props.todos });
    }
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
 
  render () {
    return (
      <div>
        <section className="filtering">
          <div className="show-category">
            <Select 
              change = {this.change} 
              value = {this.state.value}
              defaultOption = {'All'}
            />
          </div>
          <FilteringButtons 
            showAll = {this.showAll}
            showToBe = {this.showToBe}
            showDone = {this.showDone}
            filter = {this.state.filter}
          />
        </section> 
          <Todos 
            todos = {this.state.filteredTodos}
            deleteTodo = {this.props.deleteTodo}
            toggleDone = {this.toggleDone}
            toggleDetails = {this.toggleDetails}
          />
      </div>    
    )
  }

}

export default Filter

