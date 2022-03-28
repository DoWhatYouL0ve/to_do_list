import React from 'react';
import './reset.css';
import './AppStyles.css'
import {TaskPropsType, ToDoList} from "./ToDoList";

function App() {

    let task1: Array<TaskPropsType> = [
        {id: 1, title: 'HTML / CSS', isDone: true},
        {id: 2, title: 'JAVASCRIPT', isDone: true},
        {id: 3, title: 'REACT', isDone: false}
    ]

    let task2: Array<TaskPropsType> = [
        {id: 1, title: 'Bread', isDone: true},
        {id: 2, title: 'Milk', isDone: false},
        {id: 3, title: 'Water', isDone: false}
    ]

  return (
    <div className="App">
      <ToDoList title={'What to learn'} tasks={task1}/>
      <ToDoList title={'What to buy'} tasks={task2}/>
    </div>
  );
}



export default App;
