import '../App.css';
import * as React from 'react';
import Select from './select';

const Form = ({handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit}>
      <input 
      name="todoName" 
      id="input" type="text" placeholder="What is in your mind ?" className="form-control input" />
      <textarea  name = "details" className="form-control textarea" rows="3" placeholder="Todo Delatils (Optional)"></textarea>
      <Select 
        defaultOption = {'Choose category'}
      />
      <button 
        id="submit" 
        className="btn btn-primary btn-circle btn-lg button-submit"
        type="submit"
        >+ New Task
      </button>
    </form>  
  )
}

export default Form




