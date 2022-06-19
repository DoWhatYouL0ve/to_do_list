import React, { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
} from '../../store/tasksReducer'
import style from '../../ToDoList.module.css'
import Checkbox from '@mui/material/Checkbox'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import { IconButton } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import { TaskPropsType } from '../../ToDoList'

type BaseTaskPropsType = {
    t: TaskPropsType
    todoListId: string
}

export const Task = React.memo((props: BaseTaskPropsType) => {
    const dispatch = useDispatch()
    const onClickDeleteTaskHandler = () => {
        dispatch(removeTaskAC(props.todoListId, props.t.id))
    }
    const onChangeCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(
            changeTaskStatusAC(
                props.todoListId,
                props.t.id,
                e.currentTarget.checked
            )
        )
    }
    const onChangeTaskTitleHandler = (value: string) => {
        dispatch(changeTaskTitleAC(props.t.id, value, props.todoListId))
    }

    return (
        <li key={props.t.id} className={props.t.isDone ? style.isDone : ''}>
            <Checkbox
                checked={props.t.isDone}
                onChange={onChangeCheckBoxHandler}
            />
            <EditableSpan
                title={props.t.title}
                onChange={onChangeTaskTitleHandler}
            />
            <IconButton aria-label="delete" onClick={onClickDeleteTaskHandler}>
                <ClearIcon />
            </IconButton>
        </li>
    )
})
