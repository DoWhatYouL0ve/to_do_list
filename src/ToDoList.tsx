import React from 'react'
import { FilterValueType } from './App'

export type TaskPropsType = {
    id: number
    title: string
    isDone: boolean
}

type ToDoListPropsType = {
    title: string
    tasks: Array<TaskPropsType>
    onClickDeleteTask: (id: number) => void
    changeFilter: (FilterChangedType: FilterValueType) => void
}

export const ToDoList = (props: ToDoListPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type="text" />
                <button>+</button>
                <ul>
                    {props.tasks.map((t) => (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone} />
                            <span>{t.title}</span>
                            <button
                                onClick={() => props.onClickDeleteTask(t.id)}
                            >
                                x
                            </button>
                        </li>
                    ))}
                </ul>
                <div>
                    <button onClick={() => props.changeFilter('all')}>
                        All
                    </button>
                    <button onClick={() => props.changeFilter('active')}>
                        Active
                    </button>
                    <button onClick={() => props.changeFilter('completed')}>
                        Completed
                    </button>
                </div>
            </div>
        </div>
    )
}
