import React, { useEffect, useState } from 'react'
import { todoListsApi, todoListTaskApi } from '../api/todoListsApi'

export default {
    title: 'API',
}

//todoLists
export const GetTodoLists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todoListsApi.getTodoLists().then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListsApi.createTodoList('YoYo scammers').then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListsApi
            .deleteTodoList('1e743ad3-0d1a-4b6f-a8d4-d21102cc8241')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListsApi
            .updateTodoList(
                '1e1af45c-944c-4f52-98f4-f1ef3598b636',
                'refactoring completed 123'
            )
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

//tasks for todoList
export const GetTodoListTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>('')

    const getTasks = () => {
        todoListTaskApi.getTodoListsTasks(todolistId).then((res) => {
            setState(res.data)
        })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input
                    type="text"
                    placeholder={'todolistId'}
                    value={todolistId}
                    onChange={(e) => {
                        setTodolistId(e.currentTarget.value)
                    }}
                />
                <button onClick={getTasks}>Get Tasks</button>
            </div>
        </div>
    )
}
export const CreateTodoListTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>('')
    const [taskTitle, setTaskTitle] = useState<any>('')

    const createTask = () => {
        todoListTaskApi
            .createTodoListsTasks(todolistId, taskTitle)
            .then((res) => {
                setState(res.data)
            })
    }

    return (
        <div>
            {' '}
            {JSON.stringify(state)}
            <div>
                <input
                    type="text"
                    placeholder={'todolistId'}
                    value={todolistId}
                    onChange={(e) => {
                        setTodolistId(e.currentTarget.value)
                    }}
                />
                <input
                    type="text"
                    placeholder={'Task title'}
                    value={taskTitle}
                    onChange={(e) => {
                        setTaskTitle(e.currentTarget.value)
                    }}
                />
                <button onClick={createTask}>Create Task</button>
            </div>
        </div>
    )
}
export const UpdateTodoListTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>('')
    const [taskId, setTaskId] = useState<any>('')
    const [taskTitle, setTaskTitle] = useState<any>('')

    const updateTask = () => {
        todoListTaskApi
            .updateTodoListsTasks(todolistId, taskId, taskTitle)
            .then((res) => {
                setState(res.data)
            })
    }

    return (
        <div>
            {' '}
            {JSON.stringify(state)}
            <div>
                <input
                    type="text"
                    placeholder={'todolistId'}
                    value={todolistId}
                    onChange={(e) => {
                        setTodolistId(e.currentTarget.value)
                    }}
                />
                <input
                    type="text"
                    placeholder={'taskId'}
                    value={taskId}
                    onChange={(e) => {
                        setTaskId(e.currentTarget.value)
                    }}
                />
                <input
                    type="text"
                    placeholder={'Task title'}
                    value={taskTitle}
                    onChange={(e) => {
                        setTaskTitle(e.currentTarget.value)
                    }}
                />
                <button onClick={updateTask}>Update Task</button>
            </div>
        </div>
    )
}
export const DeleteTodoListTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>('')
    const [taskId, setTaskId] = useState<any>('')

    const deleteTask = () => {
        const todolistId = '5aedf3d0-e37b-434f-b8a6-227c559f25b9'
        const taskId = 'c241253f-e1d2-4923-8f36-dc1c6b4e0481'
        todoListTaskApi.deleteTodoListsTasks(todolistId, taskId).then((res) => {
            setState(res.data)
        })
    }

    return (
        <div>
            {' '}
            {JSON.stringify(state)}
            <div>
                <input
                    type="text"
                    placeholder={'todolistId'}
                    value={todolistId}
                    onChange={(e) => {
                        setTodolistId(e.currentTarget.value)
                    }}
                />
                <input
                    type="text"
                    placeholder={'taskId'}
                    value={taskId}
                    onChange={(e) => {
                        setTaskId(e.currentTarget.value)
                    }}
                />
                <button onClick={deleteTask}>Delete</button>
            </div>
        </div>
    )
}
