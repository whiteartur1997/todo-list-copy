import { AppBar, Button, CircularProgress, Container, IconButton, LinearProgress, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar';
import { logoutUser } from '../features/Login/auth-reducer';
import { Login } from '../features/Login/Login';
import { TodolistLists } from '../features/Todolists/TodolistLists';
import { initializeApp, RequestStatusType } from './app-reducer';
import './App.css';
import { AppRootStateType } from './store';

type PropsType = {
    demo?: boolean
}

function App({ demo = false }: PropsType) {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
    const isAppInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized);
    const appStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeApp());
    }, [dispatch]);

    const logoutHandler = useCallback(() => {
        dispatch(logoutUser());
    }, [dispatch]);

    if (!isAppInitialized) {
        return <div
            style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
            <CircularProgress />
        </div>

    }

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
                    {isLoggedIn && <Button onClick={logoutHandler} color="inherit">Log out</Button>}
                </Toolbar>
            </AppBar>
            {appStatus === "loading" && <LinearProgress color="secondary" />}
            <Container fixed>
                <Switch>
                    <Route exact path="/" render={() => <TodolistLists demo={demo} />} />
                    <Route path="/login" render={() => <Login />} />
                    <Route path="/404error" render={() => <h1>404 Error Occurred</h1>} />
                    <Redirect from={"*"} to="/404error" />
                </Switch>
            </Container>
            <ErrorSnackbar />
        </div>
    );
}

export default App;
