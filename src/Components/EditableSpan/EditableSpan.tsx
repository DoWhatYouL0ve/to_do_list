import React, { ChangeEvent, useState } from 'react'

export type EditableSpanPropsType = {
    title: string
    onChange: (value: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState('')

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.onChange(title)
        setTitle(props.title)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode ? (
        <input
            value={title}
            onBlur={deactivateEditMode}
            autoFocus={true}
            onChange={changeTitle}
        />
    ) : (
        <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}
