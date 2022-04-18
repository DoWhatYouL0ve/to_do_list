import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { FilterValueType } from './App'
import style from './ToDoList.module.css'

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
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValueType
}

export const ToDoList = (props: ToDoListPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
        setError('')
    }
    const onKeyPressEventHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (newTaskTitle.trim() !== '') {
            setError(null)
            if (e.code === 'Enter') {
                props.addTask(newTaskTitle.trim())
                setNewTaskTitle('')
            }
        }
    }
    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim())
            setNewTaskTitle('')
            setError('')
        } else {
            setError('Title is required!')
        }
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
                    className={error ? style.error : ''}
                />
                <button onClick={addTaskHandler}>+</button>
                {error && <div className={style.errorMessage}>{error}</div>}
                <ul>
                    {props.tasks.map((t) => {
                        const onClickDeleteTaskHandler = () => {
                            props.onClickDeleteTask(t.id)
                        }
                        const onChangeCheckBoxHandler = (
                            e: ChangeEvent<HTMLInputElement>
                        ) => {
                            props.changeTaskStatus(
                                t.id,
                                e.currentTarget.checked
                            )
                        }

                        return (
                            <li
                                key={t.id}
                                className={t.isDone ? style.isDone : ''}
                            >
                                <input
                                    type="checkbox"
                                    checked={t.isDone}
                                    onChange={onChangeCheckBoxHandler}
                                />
                                <span>{t.title}</span>
                                <button onClick={onClickDeleteTaskHandler}>
                                    x
                                </button>
                            </li>
                        )
                    })}
                </ul>
                <div>
                    <button
                        onClick={useFilterAll}
                        className={
                            props.filter === 'all' ? style.activeFilter : ''
                        }
                    >
                        All
                    </button>
                    <button
                        onClick={useFilterActive}
                        className={
                            props.filter === 'active' ? style.activeFilter : ''
                        }
                    >
                        Active
                    </button>
                    <button
                        onClick={useFilterCompleted}
                        className={
                            props.filter === 'completed'
                                ? style.activeFilter
                                : ''
                        }
                    >
                        Completed
                    </button>
                </div>
            </div>
        </div>
    )
}
