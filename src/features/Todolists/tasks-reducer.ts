import {Dispatch} from 'redux';
import {TaskType, todolistsAPI, UpdateTaskModelType} from '../../api/todolists-api';
import {RequestStatusType, setAppStatusAC} from '../../app/app-reducer';
import {AppRootStateType} from '../../app/store';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {addTodolistAC, changeTodolistEntityStatusAC, removeTodolistAC, setTodolistsAC} from './todolists-reducer';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// types
// type ActionsType = ReturnType<typeof removeTaskAC>
//     | ReturnType<typeof addTaskAC>
//     | ReturnType<typeof updateTaskAC>
//     | ReturnType<typeof addTodolistAC>
//     | ReturnType<typeof removeTodolistAC>
//     | ReturnType<typeof setTodolistsAC>
//     | ReturnType<typeof setTasksAC>
//     | ReturnType<typeof changeTodolistEntityStatusAC>
//     | ReturnType<typeof changeTaskEntityStatusAC>;
type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}


const initialState: TasksStateType = {}

const slice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        removeTaskAC: (state, action: PayloadAction<{ taskId: string, todolistId: string }>) => {
            const index = state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId);
            if (index !== -1) {
                state[action.payload.todolistId].splice(index, 1);
            }
        },
        addTaskAC: (state, action: PayloadAction<{ task: TaskType }>) => {
            state[action.payload.task.todoListId].unshift(action.payload.task);
        },
        updateTaskAC: (state, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskModelType, todolistId: string }>) => {
            const index = state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId);
            if (index !== -1) {
                state[action.payload.todolistId][index] = {...state[action.payload.todolistId][index], ...action.payload.model};
            }
        },
        setTasksAC: (state, action: PayloadAction<{ todolistId: string, tasks: TaskType[] }>) => {
            state[action.payload.todolistId] = action.payload.tasks
        },
        changeTaskEntityStatusAC: (state, action: PayloadAction<{ taskId: string, status: RequestStatusType, todolistId: string }>) => {
            const index = state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId);
            if (index !== -1) {
                state[action.payload.todolistId][index].entityStatus = action.payload.status
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = [];
        });
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.id];
        });
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach(tl => {
                state[tl.id] = []
            })
        });
    }
})


export const {removeTaskAC, addTaskAC, updateTaskAC, setTasksAC, changeTaskEntityStatusAC} = slice.actions;
export const tasksReducer = slice.reducer;

// thunks
export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}));
    dispatch(changeTodolistEntityStatusAC({id: todolistId, entityStatus: "loading"}));
    todolistsAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC({todolistId: todolistId, tasks: res.data.items}));
            dispatch(setAppStatusAC({status: "succeeded"}));
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch);
        })
        .finally(() => {
            dispatch(changeTodolistEntityStatusAC({id: todolistId, entityStatus: "idle"}));
        })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}));
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC({task: res.data.data.item}));
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch);
        })
}
export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}));
    dispatch(changeTaskEntityStatusAC({taskId: taskId, status: "loading", todolistId: todolistId}));
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC({taskId: taskId, todolistId: todolistId}));
                dispatch(setAppStatusAC({status: "succeeded"}));
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch);
        })
}
export const updateTaskTC =
    (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
        (dispatch: Dispatch, getState: () => AppRootStateType) => {
            const task = getState().tasks[todolistId].find(t => t.id === taskId);

            if (!task) {
                console.warn("No such task");
                return
            }

            const apiModel: UpdateTaskModelType = {
                title: task.title,
                deadline: task.deadline,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
                status: task.status,
                ...domainModel
            }
            dispatch(setAppStatusAC({status: "loading"}));
            dispatch(changeTaskEntityStatusAC({taskId, status: "loading", todolistId}));
            todolistsAPI.updateTask(todolistId, taskId, apiModel)
                .then(res => {
                    if (res.data.resultCode === 0) {
                        dispatch(updateTaskAC({taskId, model: domainModel, todolistId}));
                        dispatch(setAppStatusAC({status: "succeeded"}));
                        dispatch(changeTaskEntityStatusAC({taskId, status: "succeeded", todolistId}));
                    } else {
                        handleServerAppError(res.data, dispatch);
                    }
                })
                .catch(err => {
                    handleServerNetworkError(err, dispatch);
                })
                .finally(() => {
                    dispatch(changeTaskEntityStatusAC({taskId, status: "idle", todolistId}));
                })
        }
