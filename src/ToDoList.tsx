import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { FilterValueType } from './App'
import style from './ToDoList.module.css'
import { AddItemForm } from './Components/AddItemForm/AddItemForm'
import { EditableSpan } from './Components/EditableSpan/EditableSpan'

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
    onChangeTaskTitle: (
        taskId: string,
        newTitle: string,
        todoListId: string
    ) => void
    onChangeToDoListTitle: (todoListId: string, newTitle: string) => void
}

export const ToDoList = (props: ToDoListPropsType) => {
    const useFilterAll = () => props.changeFilter('all', props.todoListId)
    const useFilterActive = () => props.changeFilter('active', props.todoListId)
    const useFilterCompleted = () =>
        props.changeFilter('completed', props.todoListId)

    const deleteToDoList = () => {
        props.deleteToDoList(props.todoListId)
    }

    const addTaskHandler = (title: string) => {
        props.addTask(title, props.todoListId)
    }

    const onChangeToDoListTitleHandler = (newTitle: string) => {
        props.onChangeToDoListTitle(props.todoListId, newTitle)
    }

    return (
        <div>
            <h3>
                <EditableSpan
                    title={props.title}
                    onChange={onChangeToDoListTitleHandler}
                />
                <button onClick={deleteToDoList}>x</button>
            </h3>
            <div>
                <AddItemForm addItem={addTaskHandler} />
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
                        const onChangeTaskTitleHandler = (value: string) => {
                            props.onChangeTaskTitle(
                                t.id,
                                value,
                                props.todoListId
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
                                <EditableSpan
                                    title={t.title}
                                    onChange={onChangeTaskTitleHandler}
                                />
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
