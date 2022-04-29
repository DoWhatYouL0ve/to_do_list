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
    onClickDeleteTask: (todoListId: string, id: string) => void
    changeFilter: (
        FilterChangedType: FilterValueType,
        todoListId: string
    ) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (
        todoListId: string,
        taskId: string,
        isDone: boolean
    ) => void
    filter: FilterValueType
    todoListId: string
    deleteToDoList: (todoListId: string) => void
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
                props.addTask(newTaskTitle.trim(), props.todoListId)
                setNewTaskTitle('')
            }
        }
    }
    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim(), props.todoListId)
            setNewTaskTitle('')
            setError('')
        } else {
            setError('Title is required!')
        }
    }

    const useFilterAll = () => props.changeFilter('all', props.todoListId)
    const useFilterActive = () => props.changeFilter('active', props.todoListId)
    const useFilterCompleted = () =>
        props.changeFilter('completed', props.todoListId)

    const deleteToDoList = () => {
        props.deleteToDoList(props.todoListId)
    }

    return (
        <div>
            <h3>
                {props.title} <button onClick={deleteToDoList}>x</button>
            </h3>
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
                            props.onClickDeleteTask(props.todoListId, t.id)
                        }
                        const onChangeCheckBoxHandler = (
                            e: ChangeEvent<HTMLInputElement>
                        ) => {
                            props.changeTaskStatus(
                                props.todoListId,
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
