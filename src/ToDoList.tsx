import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { FilterValueType } from './App'

export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

type ToDoListPropsType = {
    title: string
    tasks: Array<TaskPropsType>
    onClickDeleteTask: (id: string) => void
    changeFilter: (FilterChangedType: FilterValueType) => void
    addTask: (title: string) => void
}

export const ToDoList = (props: ToDoListPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressEventHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }
    const addTaskHandler = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle('')
    }
    const useFilterAll = () => props.changeFilter('all')
    const useFilterActive = () => props.changeFilter('active')
    const useFilterCompleted = () => props.changeFilter('completed')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    type="text"
                    value={newTaskTitle}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressEventHandler}
                />
                <button onClick={addTaskHandler}>+</button>
                <ul>
                    {props.tasks.map((t) => {
                        const onClickDeleteTaskHandler = () => {
                            props.onClickDeleteTask(t.id)
                        }

                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone} />
                                <span>{t.title}</span>
                                <button onClick={onClickDeleteTaskHandler}>
                                    x
                                </button>
                            </li>
                        )
                    })}
                </ul>
                <div>
                    <button onClick={useFilterAll}>All</button>
                    <button onClick={useFilterActive}>Active</button>
                    <button onClick={useFilterCompleted}>Completed</button>
                </div>
            </div>
        </div>
    )
}
