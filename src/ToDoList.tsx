import React, { ChangeEvent } from 'react'
import { FilterValueType, TaskStateType } from './AppWithRedux'
import style from './ToDoList.module.css'
import { AddItemForm } from './Components/AddItemForm/AddItemForm'
import { EditableSpan } from './Components/EditableSpan/EditableSpan'
import { Button, ButtonGroup, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox'
import ClearIcon from '@mui/icons-material/Clear'
import { useDispatch, useSelector } from 'react-redux'
import { RootStateType } from './store/store'
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
} from './store/tasksReducer'

export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

export type ToDoListPropsType = {
    title: string
    changeFilter: (
        FilterChangedType: FilterValueType,
        todoListId: string
    ) => void
    filter: FilterValueType
    todoListId: string
    deleteToDoList: (todoListId: string) => void
    onChangeToDoListTitle: (todoListId: string, newTitle: string) => void
}

export const ToDoList = (props: ToDoListPropsType) => {
    const dispatch = useDispatch()
    const tasks = useSelector<RootStateType, TaskPropsType[]>(
        (state) => state.taskReducer[props.todoListId]
    )

    const useFilterAll = () => props.changeFilter('all', props.todoListId)
    const useFilterActive = () => props.changeFilter('active', props.todoListId)
    const useFilterCompleted = () =>
        props.changeFilter('completed', props.todoListId)

    let TasksForToDoList = tasks
    if (props.filter === 'completed') {
        TasksForToDoList = tasks.filter((t) => t.isDone)
    }
    if (props.filter === 'active') {
        TasksForToDoList = tasks.filter((t) => !t.isDone)
    }

    const deleteToDoList = () => {
        props.deleteToDoList(props.todoListId)
    }

    const addTaskHandler = (title: string) => {
        dispatch(addTaskAC(title, props.todoListId))
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
                    {TasksForToDoList?.map((t) => {
                        const onClickDeleteTaskHandler = () => {
                            dispatch(removeTaskAC(props.todoListId, t.id))
                        }
                        const onChangeCheckBoxHandler = (
                            e: ChangeEvent<HTMLInputElement>
                        ) => {
                            dispatch(
                                changeTaskStatusAC(
                                    props.todoListId,
                                    t.id,
                                    e.currentTarget.checked
                                )
                            )
                        }
                        const onChangeTaskTitleHandler = (value: string) => {
                            dispatch(
                                changeTaskTitleAC(t.id, value, props.todoListId)
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
