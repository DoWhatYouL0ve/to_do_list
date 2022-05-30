import {
    combineReducers,
    legacy_createStore as createStore,
    Store,
} from 'redux'
import { todoListsReducer } from './todolistsReducer'
import { taskReducer } from './tasksReducer'

export const rootReducer = combineReducers({
    todoListsReducer,
    taskReducer,
})

export type RootStateType = ReturnType<typeof rootReducer>

export const store: Store = createStore(rootReducer)
