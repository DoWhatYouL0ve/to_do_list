import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import style from '../AddItemForm/AddItemForm.module.css'

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
            <input
                type="text"
                value={newTaskTitle}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressEventHandler}
                className={error ? style.error : ''}
            />
            <button onClick={addTaskHandler}>+</button>
            {error && <div className={style.errorMessage}>{error}</div>}
        </div>
    )
}
