import {Dispatch} from 'redux';
import {todolistsAPI, TodolistType} from '../../api/todolists-api';
import {RequestStatusType, setAppStatusAC} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// types
// type ActionsType = ReturnType<typeof removeTodolistAC>
//     | ReturnType<typeof addTodolistAC>
//     | ReturnType<typeof changeTodolistFilterAC>
//     | ReturnType<typeof changeTodolistTitleAC>
//     | ReturnType<typeof setTodolistsAC>
//     | ReturnType<typeof changeTodolistEntityStatusAC>;
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}

const initialState: Array<TodolistDomainType> = [];

const slice = createSlice({
    name: "todolists",
    initialState,
    reducers: {
        addTodolistAC: (state, action:PayloadAction<{todolist: TodolistType}>) => {
            state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle"})
        },
        removeTodolistAC: (state, action:PayloadAction<{id: string}>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            if(index !== -1) {
                state.splice(index, 1);
            }
        },
        changeTodolistTitleAC: (state, action:PayloadAction<{id: string, title: string}>) => {
            const todolistIndex = state.findIndex(tl => tl.id === action.payload.id);
            if(todolistIndex !== -1) {
                state[todolistIndex].title = action.payload.title
            }
        },
        changeTodolistFilterAC: (state, action:PayloadAction<{id: string, filter: FilterValuesType}>) => {
            const todolistIndex = state.findIndex(tl => tl.id === action.payload.id);
            if(todolistIndex !== -1) {
                state[todolistIndex].filter = action.payload.filter
            }
        },
        changeTodolistEntityStatusAC: (state, action:PayloadAction<{id: string, entityStatus: RequestStatusType}>) => {
            const todolistIndex = state.findIndex(tl => tl.id === action.payload.id);
            if(todolistIndex !== -1) {
                state[todolistIndex].entityStatus = action.payload.entityStatus
            }
        },
        setTodolistsAC: (state, action:PayloadAction<{todolists: TodolistType[]}>) => {
            return action.payload.todolists.map(tl => ({...tl, filter: "all", entityStatus: "idle"}))
        },
    }
})

export const todolistsReducer = slice.reducer;
export const {addTodolistAC, removeTodolistAC,
    changeTodolistTitleAC, changeTodolistFilterAC,
    changeTodolistEntityStatusAC, setTodolistsAC} = slice.actions;

// thunks
export const getTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}));
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC({todolists: res.data}));
            dispatch(setAppStatusAC({status: "succeeded"}));
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch);
        })
}
export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}));
    dispatch(changeTodolistEntityStatusAC({id: todolistId, entityStatus: "loading"}));
    todolistsAPI.deleteTodolist(todolistId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodolistAC({id: todolistId}));
                dispatch(setAppStatusAC({status: "succeeded"}));
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch);
        })
        .finally(() => {
            dispatch(changeTodolistEntityStatusAC( {id: todolistId, entityStatus: "idle"}));
        })
}
export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}));
    todolistsAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC({todolist: res.data.data.item}));
                dispatch(setAppStatusAC({status: "succeeded"}));
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch);
        })
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}));
    dispatch(changeTodolistEntityStatusAC({id: todolistId, entityStatus: "loading"}));
    todolistsAPI.updateTodolist(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC({id: todolistId, title: title}));
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch);
        })
        .finally(() => {
            dispatch(setAppStatusAC({status: "idle"}));
            dispatch(changeTodolistEntityStatusAC({id: todolistId, entityStatus: "idle"}));
        })
}