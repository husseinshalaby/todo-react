import '../App.css';
import * as React from 'react';
import { Button } from 'react-bootstrap';

const FilteringButtons = ({ showAll, showToBe, showDone, filter }) => {
  return (
    <div>
      <ul className="sorting">
        <li>
          <Button 
          onClick= {() => showAll()}
          className="filter-button showAll " 
          variant={filter === 'all' ?"primary": "outline-primary"}
          >
            Show All
          </Button>
        </li>
        <li>
          <Button 
          onClick= {() => showToBe()} 
          variant={filter === 'tobe' ?"primary": "outline-primary"} 
          className="filter-button toBeDone ">
            To Be 
          </Button>
        </li>
        <li>
          <Button 
          onClick= {() => showDone()} 
          variant={filter === 'done' ?"primary": "outline-primary"} 
          className="filter-button done ">
            Done
          </Button>
        </li>
      </ul>
    </div>
  )
}

export default FilteringButtons

