import React from 'react'
import { ComponentMeta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { EditableSpan } from './EditableSpan'

export default {
    title: 'ToDoList/EditableSpan',
    component: EditableSpan,
} as ComponentMeta<typeof EditableSpan>

const callback = action('function "Change title" was called')

export const AddItemFormBaseExample = () => {
    return <EditableSpan title={'Title'} onChange={callback} />
}
