import { FilterValueType, TodoListsPropsType } from '../AppWithRedux'
import { v1 } from 'uuid'

export const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
export const ADD_TODOLIST = 'ADD_TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE'
const CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER'

export type RemoveTodoListActionType = {
    type: typeof REMOVE_TODOLIST
    id: string
}
export type AddTodoListActionType = {
    type: typeof ADD_TODOLIST
    title: string
    todolistId: string
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

export let todoListId1 = v1()
export let todoListId2 = v1()

const initialState: TodoListsPropsType[] = []

export const todoListsReducer = (
    state: TodoListsPropsType[] = initialState,
    action: ActionType
): TodoListsPropsType[] => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return state.filter((td) => td.id !== action.id)
        case ADD_TODOLIST: {
            let todoList: TodoListsPropsType = {
                id: action.todolistId,
                title: action.title,
                filter: 'all',
            }
            return [todoList, ...state]
        }
        case CHANGE_TODOLIST_TITLE: {
            let todoList = state.find((td) => td.id === action.id)
            if (todoList) {
                todoList.title = action.title
            }
            return [...state]
        }
        case CHANGE_TODOLIST_FILTER:
            {
                let todoList = state.find((td) => td.id === action.id)
                if (todoList) {
                    todoList.filter = action.filter
                }
            }
            return [...state]
        default:
            return state
    }
}

export const removeTodoListAC = (
    todolistId: string
): RemoveTodoListActionType => {
    return { type: REMOVE_TODOLIST, id: todolistId }
}

export const addTodoListAC = (title: string): AddTodoListActionType => {
    return { type: ADD_TODOLIST, title, todolistId: v1() }
}

export const changeTodoListsTitleAC = (
    id: string,
    title: string
): ChangeTodoListsTitleActionType => {
    return { type: CHANGE_TODOLIST_TITLE, id, title }
}

export const changeTodoListsFilterAC = (
    id: string,
    filter: FilterValueType
): ChangeTodoListsFilterActionType => {
    return { type: CHANGE_TODOLIST_FILTER, id, filter }
}
