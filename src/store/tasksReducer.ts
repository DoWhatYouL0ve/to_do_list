import { TaskStateType } from '../AppWithRedux'
import { v1 } from 'uuid'
import { TaskPropsType } from '../ToDoList'
import {
    ADD_TODOLIST,
    AddTodoListActionType,
    REMOVE_TODOLIST,
    RemoveTodoListActionType,
    todoListId1,
    todoListId2,
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

const initialState: TaskStateType = {}

export const taskReducer = (
    state: TaskStateType = initialState,
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
                ...state,
                [action.todoListId]: [task, ...state[action.todoListId]],
            }
        }
        case REMOVE_TASK:
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(
                    (t) => t.id !== action.id
                ),
            }
        case CHANGE_TASK_STATUS:
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map((t) =>
                    t.id === action.taskId ? { ...t, isDone: action.isDone } : t
                ),
            }
        case CHANGE_TASK_TITLE:
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map((t) =>
                    t.id === action.taskId
                        ? { ...t, title: action.newTitle }
                        : t
                ),
            }
        case ADD_TODOLIST: {
            return { ...state, [action.todolistId]: [] }
        }
        case REMOVE_TODOLIST: {
            const stateCopy = state
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
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
