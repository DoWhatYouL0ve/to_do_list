import React from 'react'
import { ComponentMeta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Task } from './Task'
import { Provider } from 'react-redux'
import { store } from '../../store/store'

export default {
    title: 'ToDoList/Task',
    component: Task,
} as ComponentMeta<typeof Task>

export const TaskBaseExample = () => {
    return (
        <Provider store={store}>
            <Task
                t={{ id: '1', title: 'React', isDone: true }}
                todoListId={'td1'}
            />
            <Task
                t={{ id: '2', title: 'JS', isDone: false }}
                todoListId={'td1'}
            />
        </Provider>
    )
}
