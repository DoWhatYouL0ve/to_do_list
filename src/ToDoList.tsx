import React, { useCallback } from 'react'
import { FilterValueType } from './AppWithRedux'
import style from './ToDoList.module.css'
import { AddItemForm } from './Components/AddItemForm/AddItemForm'
import { EditableSpan } from './Components/EditableSpan/EditableSpan'
import { Button, ButtonGroup, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { RootStateType } from './store/store'
import { addTaskAC } from './store/tasksReducer'
import { Task } from './Components/Task/Task'

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

export const ToDoList = React.memo((props: ToDoListPropsType) => {
    const dispatch = useDispatch()
    const tasks = useSelector<RootStateType, TaskPropsType[]>(
        (state) => state.taskReducer[props.todoListId]
    )

    const useFilterAll = useCallback(
        () => props.changeFilter('all', props.todoListId),
        [props.changeFilter, props.todoListId]
    )
    const useFilterActive = useCallback(
        () => props.changeFilter('active', props.todoListId),
        [props.changeFilter, props.todoListId]
    )
    const useFilterCompleted = useCallback(
        () => props.changeFilter('completed', props.todoListId),
        [props.changeFilter, props.todoListId]
    )

    let TasksForToDoList = tasks
    if (props.filter === 'completed') {
        TasksForToDoList = tasks.filter((t) => t.isDone)
    }
    if (props.filter === 'active') {
        TasksForToDoList = tasks.filter((t) => !t.isDone)
    }

    const deleteToDoList = useCallback(() => {
        props.deleteToDoList(props.todoListId)
    }, [props.todoListId, props.deleteToDoList])

    const addTaskHandler = useCallback(
        (title: string) => {
            dispatch(addTaskAC(title, props.todoListId))
        },
        [dispatch]
    )

    const onChangeToDoListTitleHandler = useCallback(
        (newTitle: string) => {
            props.onChangeToDoListTitle(props.todoListId, newTitle)
        },
        [props.todoListId, props.onChangeToDoListTitle]
    )

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
                    {TasksForToDoList?.map((t) => (
                        <Task t={t} todoListId={props.todoListId} key={t.id} />
                    ))}
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
})

/*type BaseTaskPropsType = {
    t: TaskPropsType
    todoListId: string
}

const Task = React.memo((props: BaseTaskPropsType) => {
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
})*/
