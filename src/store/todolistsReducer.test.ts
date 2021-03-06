import { FilterValueType, TodoListsPropsType } from '../AppWithRedux'
import {
    addTodoListAC,
    changeTodoListsFilterAC,
    ChangeTodoListsFilterActionType,
    changeTodoListsTitleAC,
    ChangeTodoListsTitleActionType,
    removeTodoListAC,
    todoListsReducer,
} from './todolistsReducer'
import { v1 } from 'uuid'

test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodoListsPropsType> = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]

    const endState = todoListsReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: Array<TodoListsPropsType> = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]

    const endState = todoListsReducer(
        startState,
        addTodoListAC(newTodolistTitle)
    )

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: Array<TodoListsPropsType> = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]

    const endState = todoListsReducer(
        startState,
        changeTodoListsTitleAC(todolistId2, newTodolistTitle)
    )

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newFilter: FilterValueType = 'completed'

    const startState: Array<TodoListsPropsType> = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]

    const action: ChangeTodoListsFilterActionType = {
        type: 'CHANGE_TODOLIST_FILTER',
        id: todolistId2,
        filter: newFilter,
    }

    const endState = todoListsReducer(
        startState,
        changeTodoListsFilterAC(todolistId2, newFilter)
    )

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})
