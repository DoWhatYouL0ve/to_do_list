import React from 'react'
import { Provider } from 'react-redux'
import {
    combineReducers,
    legacy_createStore as createStore,
    Store,
} from 'redux'
import { todoListsReducer } from '../store/todolistsReducer'
import { taskReducer } from '../store/tasksReducer'
import { v1 } from 'uuid'

export const rootReducer = combineReducers({
    todoListsReducer,
    taskReducer,
})

const initialGlobalState = {
    todolists: [
        { id: 'todolistId1', title: 'What to learn', filter: 'all' },
        { id: 'todolistId2', title: 'What to buy', filter: 'all' },
    ],
    tasks: {
        ['todolistId1']: [
            { id: v1(), title: 'HTML', isDone: true },
            { id: v1(), title: 'CSS', isDone: true },
        ],
        ['todolistId2']: [
            { id: v1(), title: 'Milk', isDone: true },
            { id: v1(), title: 'React book', isDone: true },
        ],
    },
}
export type RootStateType = ReturnType<typeof rootReducer>
export const storyBookStore: Store = createStore(
    rootReducer,
    initialGlobalState as any
)

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
