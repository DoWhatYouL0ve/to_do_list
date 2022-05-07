import React, { useState } from 'react'
import './reset.css'
import './AppStyles.css'
import { TaskPropsType, ToDoList } from './ToDoList'
import { v1 } from 'uuid'
import { AddItemForm } from './Components/AddItemForm/AddItemForm'

export type FilterValueType = 'all' | 'active' | 'completed'
export type TodoListsPropsType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TaskStateType = {
    [key: string]: Array<TaskPropsType>
}

function App() {
    let todoListId1 = v1()
    let todoListId2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListsPropsType>>([
        { id: todoListId1, title: 'What to learn', filter: 'all' },
        { id: todoListId2, title: 'What to buy', filter: 'all' },
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
        [todoListId1]: [
            { id: v1(), title: 'HTML / CSS', isDone: true },
            { id: v1(), title: 'JAVASCRIPT', isDone: true },
            { id: v1(), title: 'REACT', isDone: false },
            { id: v1(), title: 'REDUX', isDone: false },
        ],
        [todoListId2]: [
            { id: v1(), title: 'Milk', isDone: true },
            { id: v1(), title: 'Apples', isDone: true },
            { id: v1(), title: 'Bananas', isDone: false },
            { id: v1(), title: 'Water', isDone: false },
        ],
    })

    /*let task2: Array<TaskPropsType> = [
        { id: 1, title: 'Bread', isDone: true },
        { id: 2, title: 'Milk', isDone: false },
        { id: 3, title: 'Water', isDone: false },
    ]*/

    const onClickDeleteTask = (todoListId: string, id: string) => {
        let task = tasks[todoListId]
        let newTask = task.filter((t) => t.id !== id)
        tasks[todoListId] = newTask
        setTasks({ ...tasks })
    }

    const addTask = (title: string, todoListId: string) => {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false,
        }
        let task = tasks[todoListId]
        let newTasks = [newTask, ...task]
        tasks[todoListId] = newTasks
        setTasks({ ...tasks })
    }

    const addToDoList = (title: string) => {
        let todoList: TodoListsPropsType = {
            id: v1(),
            title: title,
            filter: 'all',
        }
        setTodoLists([todoList, ...todoLists])
        setTasks({ ...tasks, [todoList.id]: [] })
    }

    const changeTaskStatus = (
        todoListId: string,
        taskId: string,
        isDone: boolean
    ) => {
        let newTask = tasks[todoListId].find((t) => t.id === taskId)
        if (newTask) {
            newTask.isDone = isDone
            setTasks({ ...tasks })
        }
    }
    const onChangeTaskTitle = (
        taskId: string,
        newTitle: string,
        todoListId: string
    ) => {
        let newTask = tasks[todoListId].find((t) => t.id === taskId)
        if (newTask) {
            newTask.title = newTitle
            setTasks({ ...tasks })
        }
    }
    const changeFilter = (
        FilterChangedType: FilterValueType,
        todoListId: string
    ) => {
        let todoList = todoLists.find((td) => td.id === todoListId)
        if (todoList) {
            todoList.filter = FilterChangedType
            setTodoLists([...todoLists])
        }
    }

    const deleteToDoList = (todoListId: string) => {
        // filter out deleted todoList
        let newToDoLists = todoLists.filter((td) => td.id !== todoListId)
        // set a new list of todoLists
        setTodoLists(newToDoLists)
        // delete also tasks Array related to that todoList
        delete tasks[todoListId]
        // set a new list of tasks without related to deleted todoList
        setTasks({ ...tasks })
    }
    const onChangeToDoListTitle = (todoListId: string, newTitle: string) => {
        let todoList = todoLists.find((td) => td.id === todoListId)
        if (todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
    }

    return (
        <div className="App">
            <AddItemForm addItem={addToDoList} />
            {todoLists.map((td) => {
                let TasksForToDoList = tasks[td.id]
                if (td.filter === 'completed') {
                    TasksForToDoList = tasks[td.id].filter((t) => t.isDone)
                }
                if (td.filter === 'active') {
                    TasksForToDoList = tasks[td.id].filter((t) => !t.isDone)
                }
                return (
                    <ToDoList
                        key={td.id}
                        todoListId={td.id}
                        title={td.title}
                        tasks={TasksForToDoList}
                        onClickDeleteTask={onClickDeleteTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={td.filter}
                        deleteToDoList={deleteToDoList}
                        onChangeTaskTitle={onChangeTaskTitle}
                        onChangeToDoListTitle={onChangeToDoListTitle}
                    />
                )
            })}
        </div>
    )
}

export default App
