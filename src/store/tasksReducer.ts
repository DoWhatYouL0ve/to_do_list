import { TaskStateType } from '../App'
import { v1 } from 'uuid'
import { TaskPropsType } from '../ToDoList'
import {
    ADD_TODOLIST,
    AddTodoListActionType,
    REMOVE_TODOLIST,
    RemoveTodoListActionType,
} from './todolistsReducer'

export const REMOVE_TASK = 'REMOVE_TASK'
export const ADD_TASK = 'ADD_TASK'
export const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS'
export const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE'

export type RemoveTaskActionType = {
    type: typeof REMOVE_TASK
    todoListId: string
    id: string
}

export type AddTaskActionType = {
    type: typeof ADD_TASK
    title: string
    todoListId: string
}

export type ChangeTaskStatusActionType = {
    type: typeof CHANGE_TASK_STATUS
    todoListId: string
    taskId: string
    isDone: boolean
}

export type ChangeTaskTitleActionType = {
    type: typeof CHANGE_TASK_TITLE
    taskId: string
    newTitle: string
    todoListId: string
}

export type ActionType =
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType

export const taskReducer = (
    initialState: TaskStateType,
    action: ActionType
): TaskStateType => {
    switch (action.type) {
        case ADD_TASK: {
            let task: TaskPropsType = {
                id: v1(),
                title: action.title,
                isDone: false,
            }
            return {
                ...initialState,
                [action.todoListId]: [task, ...initialState[action.todoListId]],
            }
        }
        case REMOVE_TASK:
            return {
                ...initialState,
                [action.todoListId]: initialState[action.todoListId].filter(
                    (t) => t.id !== action.id
                ),
            }
        case CHANGE_TASK_STATUS:
            return {
                ...initialState,
                [action.todoListId]: initialState[action.todoListId].map((t) =>
                    t.id === action.taskId ? { ...t, isDone: action.isDone } : t
                ),
            }
        case CHANGE_TASK_TITLE:
            return {
                ...initialState,
                [action.todoListId]: initialState[action.todoListId].map((t) =>
                    t.id === action.taskId
                        ? { ...t, title: action.newTitle }
                        : t
                ),
            }
        case ADD_TODOLIST: {
            const stateCopy = { ...initialState }
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case REMOVE_TODOLIST: {
            const stateCopy = initialState
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return initialState
    }
}

export const addTaskAC = (title: string, todoListId: string) => {
    return { type: ADD_TASK, title, todoListId } as const
}

export const removeTaskAC = (todoListId: string, id: string) => {
    return { type: REMOVE_TASK, todoListId, id } as const
}

export const changeTaskStatusAC = (
    todoListId: string,
    taskId: string,
    isDone: boolean
) => {
    return { type: CHANGE_TASK_STATUS, todoListId, taskId, isDone } as const
}

export const changeTaskTitleAC = (
    taskId: string,
    newTitle: string,
    todoListId: string
) => {
    return {
        type: CHANGE_TASK_TITLE,
        taskId,
        newTitle,
        todoListId,
    } as const
}
