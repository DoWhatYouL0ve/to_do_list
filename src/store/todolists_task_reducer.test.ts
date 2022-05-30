import { TaskStateType, TodoListsPropsType } from '../AppWithRedux'
import { taskReducer } from './tasksReducer'
import { addTodoListAC, todoListsReducer } from './todolistsReducer'

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {}
    const startTodolistsState: Array<TodoListsPropsType> = []

    const action = addTodoListAC('new todolist')

    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolists).toBe(action.todolistId)
})
