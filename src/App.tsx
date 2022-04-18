import React, { useState } from 'react'
import './reset.css'
import './AppStyles.css'
import { TaskPropsType, ToDoList } from './ToDoList'
import { v1 } from 'uuid'

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {
    let [task, setTask] = useState<Array<TaskPropsType>>([
        { id: v1(), title: 'HTML / CSS', isDone: true },
        { id: v1(), title: 'JAVASCRIPT', isDone: true },
        { id: v1(), title: 'REACT', isDone: false },
        { id: v1(), title: 'REDUX', isDone: false },
    ])

    let [filter, setFilter] = useState<FilterValueType>('all')

    /*let task2: Array<TaskPropsType> = [
        { id: 1, title: 'Bread', isDone: true },
        { id: 2, title: 'Milk', isDone: false },
        { id: 3, title: 'Water', isDone: false },
    ]*/

    const onClickDeleteTask = (id: string) => {
        let newTask = task.filter((t) => t.id !== id)
        setTask(newTask)
    }

    const addTask = (title: string) => {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false,
        }
        let newTasks = [newTask, ...task]
        setTask(newTasks)
    }
    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        let newTask = task.find((t) => t.id === taskId)
        if (newTask) {
            newTask.isDone = isDone
            setTask([...task])
        }
    }
    const changeFilter = (FilterChangedType: FilterValueType) => {
        setFilter(FilterChangedType)
    }

    let TasksForToDoList = task

    if (filter === 'completed') {
        TasksForToDoList = task.filter((t) => t.isDone)
    }
    if (filter === 'active') {
        TasksForToDoList = task.filter((t) => !t.isDone)
    }

    return (
        <div className="App">
            <ToDoList
                title={'What to learn'}
                tasks={TasksForToDoList}
                onClickDeleteTask={onClickDeleteTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
            {/*<ToDoList
                title={'What to buy'}
                tasks={task2}
                OnClickDelete={OnClickDelete}
            />*/}
        </div>
    )
}

export default App
