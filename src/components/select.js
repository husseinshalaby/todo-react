import '../App.css';
import * as React from 'react';

const Select = ({ change, value, defaultOption }) => {
  return (
    <select  
      defaultOption ={defaultOption}
      onChange = {change} 
      value= {value}
      name="categories" 
      className="form-select form-select-lg mb-3 select" 
      aria-label=".form-select-lg example" 
      id="category-filter" >
      <option value=''>{defaultOption}</option>
      <option value="work">Work</option>
      <option value="study">Study</option>
      <option value="sport">Sport</option>
      <option value="personal">Personal</option>
      <option value="family">Family</option>
      <option value="friends">Friends</option>
    </select>
  )
}

export default Select

