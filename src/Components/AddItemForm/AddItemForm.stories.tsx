import React from 'react'
import { AddItemForm } from './AddItemForm'
import { ComponentMeta } from '@storybook/react'
import { action } from '@storybook/addon-actions'

export default {
    title: 'ToDoList/AddItemForm',
    component: AddItemForm,
} as ComponentMeta<typeof AddItemForm>

const callback = action('Button "Add" was pressed inside the form')

export const AddItemFormBaseExample = () => {
    return <AddItemForm addItem={callback} />
}
