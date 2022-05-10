import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import style from '../AddItemForm/AddItemForm.module.css'
import { TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

export type AddItemFormPropsType = {
    addItem: (newTaskTitle: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
        setError('')
    }
    const onKeyPressEventHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (newTaskTitle.trim() !== '') {
            setError(null)
            if (e.code === 'Enter') {
                props.addItem(newTaskTitle.trim())
                setNewTaskTitle('')
            }
        }
    }

    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle('')
            setError('')
        } else {
            setError('Title is required!')
        }
    }

    return (
        <div>
            <TextField
                id="standard-basic"
                label="Type here..."
                variant="outlined"
                type="text"
                value={newTaskTitle}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressEventHandler}
                error={!!error}
                helperText={error && 'Title is required!'}
            />
            <IconButton
                onClick={addTaskHandler}
                color={'primary'}
                size={'large'}
            >
                <AddCircleOutlineIcon />
            </IconButton>
        </div>
    )
}
