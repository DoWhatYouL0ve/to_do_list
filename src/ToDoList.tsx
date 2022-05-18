import React, { ChangeEvent } from 'react'
import { FilterValueType } from './App'
import style from './ToDoList.module.css'
import { AddItemForm } from './Components/AddItemForm/AddItemForm'
import { EditableSpan } from './Components/EditableSpan/EditableSpan'
import { Button, ButtonGroup, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox'
import ClearIcon from '@mui/icons-material/Clear'

export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

export type ToDoListPropsType = {
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
                <IconButton aria-label="delete" onClick={deleteToDoList}>
                    <DeleteIcon />
                </IconButton>
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
                                <Checkbox
                                    checked={t.isDone}
                                    onChange={onChangeCheckBoxHandler}
                                />
                                <EditableSpan
                                    title={t.title}
                                    onChange={onChangeTaskTitleHandler}
                                />
                                <IconButton
                                    aria-label="delete"
                                    onClick={onClickDeleteTaskHandler}
                                >
                                    <ClearIcon />
                                </IconButton>
                            </li>
                        )
                    })}
                </ul>
                <div>
                    <ButtonGroup
                        variant="outlined"
                        aria-label="outlined primary button group"
                    >
                        <Button
                            color={'success'}
                            onClick={useFilterAll}
                            variant={
                                props.filter === 'all'
                                    ? 'contained'
                                    : 'outlined'
                            }
                        >
                            All
                        </Button>
                        <Button
                            color={'primary'}
                            onClick={useFilterActive}
                            variant={
                                props.filter === 'active'
                                    ? 'contained'
                                    : 'outlined'
                            }
                        >
                            Active
                        </Button>
                        <Button
                            color={'secondary'}
                            onClick={useFilterCompleted}
                            variant={
                                props.filter === 'completed'
                                    ? 'contained'
                                    : 'outlined'
                            }
                        >
                            Completed
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>
    )
}
