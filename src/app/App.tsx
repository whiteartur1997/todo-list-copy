import { AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar';
import { TodolistLists } from '../features/Todolists/TodolistLists';
import { RequestStatusType } from './app-reducer';
import './App.css';
import { AppRootStateType } from './store';

type PropsType = {
    demo?: boolean
}

function App({ demo = false }: PropsType) {

    const appStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            {appStatus === "loading" && <LinearProgress color="secondary" />}
            <Container fixed>
                <TodolistLists demo={demo} />
            </Container>
            <ErrorSnackbar />
        </div>
    );
}

export default App;
