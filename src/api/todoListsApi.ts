import axios from 'axios'

const apiInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '025d03b5-09be-42be-a133-c9f36a02b000',
    },
})

export type TodoListPropsType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export type TodolistTaskPropsType = {
    id: string
    title: string
    description: string
    todoListId: string
    order: number
    status: number
    priority: number
    startDate: string
    deadline: string
    addedDate: string
}

type GetTaskResponse = {
    totalCount: number
    error: string | null
    items: Array<TodolistTaskPropsType>
}

export const todoListsApi = {
    getTodoLists() {
        return apiInstance.get<Array<TodoListPropsType>>(`todo-lists`)
    },
    createTodoList(title: string) {
        return apiInstance.post<ResponseType<{ item: TodoListPropsType }>>(
            `todo-lists`,
            { title }
        )
    },
    deleteTodoList(todolistId: string) {
        return apiInstance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodoList(todolistId: string, title: string) {
        return apiInstance.put<ResponseType>(`todo-lists/${todolistId}`, {
            title,
        })
    },
}

export const todoListTaskApi = {
    getTodoListsTasks(todolistId: string) {
        return apiInstance.get<GetTaskResponse>(
            `todo-lists/${todolistId}/tasks`
        )
    },
    createTodoListsTasks(todolistId: string, title: string) {
        return apiInstance.post<ResponseType<TodolistTaskPropsType>>(
            `todo-lists/${todolistId}/tasks`,
            { title }
        )
    },
    updateTodoListsTasks(todolistId: string, taskId: string, title: string) {
        return apiInstance.put<ResponseType<TodolistTaskPropsType>>(
            `todo-lists/${todolistId}/tasks/${taskId}`,
            {
                title,
            }
        )
    },
    deleteTodoListsTasks(todolistId: string, taskId: string) {
        return apiInstance.delete<ResponseType>(
            `todo-lists/${todolistId}/tasks/${taskId}`
        )
    },
}
