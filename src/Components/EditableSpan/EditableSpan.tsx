import React, { ChangeEvent, useState } from 'react'
import style from '../AddItemForm/AddItemForm.module.css'
import { TextField } from '@mui/material'

export type EditableSpanPropsType = {
    title: string
    onChange: (value: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const deactivateEditMode = () => {
        if (title) {
            setEditMode(false)
            props.onChange(title)
            setTitle(props.title)
        } else {
            setError('Title is required ')
        }
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setTitle(e.currentTarget.value)
    }

    return editMode ? (
        <TextField
            id="standard-basic"
            label="Type here..."
            variant="standard"
            type="text"
            value={title}
            onChange={changeTitle}
            onBlur={deactivateEditMode}
            autoFocus={true}
            error={!!error}
            helperText={error && 'value is required'}
        />
    ) : (
        <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}
