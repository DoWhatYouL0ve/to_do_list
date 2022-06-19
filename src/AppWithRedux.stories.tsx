import React from 'react'
import { ComponentMeta } from '@storybook/react'
import AppWithRedux from './AppWithRedux'
import { ReduxStoreProviderDecorator } from './stories/ReduxStoreProviderDecorator'

export default {
    title: 'ToDoList/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof AppWithRedux>

export const AppWithReduxBaseExample = () => {
    return <AppWithRedux />
}
