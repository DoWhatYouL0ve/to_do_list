import { FilterValueType, TodoListsPropsType } from '../App'
import { v1 } from 'uuid'

const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
const ADD_TODOLIST = 'ADD_TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE'
const CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER'

export type RemoveTodoListActionType = {
    type: typeof REMOVE_TODOLIST
    id: string
}
export type AddTodoListActionType = {
    type: typeof ADD_TODOLIST
    title: string
}
export type ChangeTodoListsTitleActionType = {
    type: typeof CHANGE_TODOLIST_TITLE
    id: string
    title: string
}
export type ChangeTodoListsFilterActionType = {
    type: typeof CHANGE_TODOLIST_FILTER
    id: string
    filter: FilterValueType
}
export type ActionType =
    | RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListsTitleActionType
    | ChangeTodoListsFilterActionType

export const todoListsReducer = (
    initialState: TodoListsPropsType[],
    action: ActionType
): TodoListsPropsType[] => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return initialState.filter((td) => td.id !== action.id)
        case ADD_TODOLIST: {
            let todoList: TodoListsPropsType = {
                id: v1(),
                title: action.title,
                filter: 'all',
            }
            return [...initialState, todoList]
        }
        case CHANGE_TODOLIST_TITLE: {
            let todoList = initialState.find((td) => td.id === action.id)
            if (todoList) {
                todoList.title = action.title
            }
            return [...initialState]
        }
        case CHANGE_TODOLIST_FILTER:
            {
                let todoList = initialState.find((td) => td.id === action.id)
                if (todoList) {
                    todoList.filter = action.filter
                }
            }
            return [...initialState]
        default:
            return initialState
    }
}

export const RemoveTodoListAC = (
    todolistId: string
): RemoveTodoListActionType => {
    return { type: REMOVE_TODOLIST, id: todolistId }
}

export const AddTodoListAC = (title: string): AddTodoListActionType => {
    return { type: ADD_TODOLIST, title }
}

export const ChangeTodoListsTitleAC = (
    id: string,
    title: string
): ChangeTodoListsTitleActionType => {
    return { type: CHANGE_TODOLIST_TITLE, id, title }
}

export const ChangeTodoListsFilterAC = (
    id: string,
    filter: FilterValueType
): ChangeTodoListsFilterActionType => {
    return { type: CHANGE_TODOLIST_FILTER, id, filter }
}
