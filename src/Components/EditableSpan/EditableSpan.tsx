import React, { ChangeEvent, useCallback, useState } from 'react'
import style from '../AddItemForm/AddItemForm.module.css'
import { TextField } from '@mui/material'

export type EditableSpanPropsType = {
    title: string
    onChange: (value: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const activateEditMode = useCallback(() => {
        setEditMode(true)
        setTitle(props.title)
    }, [])
    const deactivateEditMode = () => {
        // eslint-disable-next-line no-debugger
        debugger
        if (title) {
            setEditMode(false)
            props.onChange(title)
            setTitle(props.title)
        } else {
            setError('Title is required ')
        }
    }
    const changeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        // eslint-disable-next-line no-debugger
        debugger
        setError(null)
        setTitle(e.currentTarget.value)
    }, [])

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
})
