import React from 'react'
import './reset.css'
import './AppStyles.css'
import { TaskPropsType, ToDoList } from './ToDoList'
import { AddItemForm } from './Components/AddItemForm/AddItemForm'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import {
    addTodoListAC,
    changeTodoListsFilterAC,
    changeTodoListsTitleAC,
    removeTodoListAC,
} from './store/todolistsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { RootStateType } from './store/store'

export type FilterValueType = 'all' | 'active' | 'completed'
export type TodoListsPropsType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TaskStateType = {
    [key: string]: Array<TaskPropsType>
}

function AppWithRedux() {
    const dispatch = useDispatch()
    const todoLists = useSelector<RootStateType, TodoListsPropsType[]>(
        (state) => state.todoListsReducer
    )
    const tasks = useSelector<RootStateType, TaskStateType>(
        (state) => state.taskReducer
    )

    const addToDoList = (title: string) => {
        dispatch(addTodoListAC(title))
    }

    const changeFilter = (
        FilterChangedType: FilterValueType,
        todoListId: string
    ) => {
        dispatch(changeTodoListsFilterAC(todoListId, FilterChangedType))
    }

    const deleteToDoList = (todoListId: string) => {
        dispatch(removeTodoListAC(todoListId))
    }

    const onChangeToDoListTitle = (todoListId: string, newTitle: string) => {
        dispatch(changeTodoListsTitleAC(todoListId, newTitle))
    }

    return (
        <div className="App">
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container fixed>
                <Grid container style={{ padding: '20px 20px 20px 0px' }}>
                    <AddItemForm addItem={addToDoList} />
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map((td) => {
                        return (
                            <Grid item key={td.id}>
                                <Paper
                                    elevation={3}
                                    style={{ padding: '10px' }}
                                >
                                    <ToDoList
                                        key={td.id}
                                        todoListId={td.id}
                                        title={td.title}
                                        changeFilter={changeFilter}
                                        filter={td.filter}
                                        deleteToDoList={deleteToDoList}
                                        onChangeToDoListTitle={
                                            onChangeToDoListTitle
                                        }
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithRedux
