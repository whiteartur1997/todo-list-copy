import { Dispatch } from 'redux';
import { TaskType, todolistsAPI, UpdateTaskModelType } from '../../api/todolists-api';
import { RequestStatusType, setAppErrorAC, setAppStatusAC } from '../../app/app-reducer';
import { AppRootStateType } from '../../app/store';
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils';
import { addTodolistAC, changeTodolistEntityStatusAC, removeTodolistAC, setTodolistsAC } from './todolists-reducer';

// types
type ActionsType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>
    | ReturnType<typeof changeTaskEntityStatusAC>;
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


const initialState: TasksStateType = {
    /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            const stateCopy = { ...state };
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'SET-TASKS': return { ...state, [action.todolistId]: action.tasks.map(t => ({ ...t, entityStatus: "idle" })) }
        case 'REMOVE-TASK':
            return { ...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId) }
        case 'ADD-TASK':
            return { ...state, [action.task.todoListId]: [{ ...action.task, entityStatus: "idle" }, ...state[action.task.todoListId]] }
        case 'UPDATE-TASK':
            return { ...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? { ...t, ...action.model } : t) }
        case 'CHANGE-TASK-ENTITY-STATUS':
            return { ...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? { ...t, entityStatus: action.status } : t) }
        case 'ADD-TODOLIST':
            return { ...state, [action.todolist.id]: [] }
        case 'REMOVE-TODOLIST': {
            const copyState = { ...state };
            delete copyState[action.id];
            return copyState;
        }
        default:
            return state;
    }
}

// actions
export const removeTaskAC = (taskId: string, todolistId: string) => ({
    type: 'REMOVE-TASK',
    taskId: taskId,
    todolistId: todolistId
} as const)
export const addTaskAC = (task: TaskType) => ({ type: 'ADD-TASK', task } as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => ({
    type: 'UPDATE-TASK',
    model,
    todolistId,
    taskId
} as const)
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({ type: 'SET-TASKS', todolistId, tasks } as const);
export const changeTaskEntityStatusAC = (taskId: string, status: RequestStatusType, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-ENTITY-STATUS',
        status,
        todolistId,
        taskId
    } as const;
}

// thunks
export const getTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC({status: "loading"}));
    dispatch(changeTodolistEntityStatusAC(todolistId, "loading"));
    todolistsAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(todolistId, res.data.items));
            dispatch(setAppStatusAC({status: "succeeded"}));
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch);
        })
        .finally(() => {
            dispatch(changeTodolistEntityStatusAC(todolistId, "idle"));
        })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC({status: "loading"}));
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item));
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch);
        })
}
export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC({status: "loading"}));
    dispatch(changeTaskEntityStatusAC(taskId, "loading", todolistId));
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(taskId, todolistId));
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
        (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
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
            dispatch(changeTaskEntityStatusAC(taskId, "loading", todolistId));
            todolistsAPI.updateTask(todolistId, taskId, apiModel)
                .then(res => {
                    if (res.data.resultCode === 0) {
                        dispatch(updateTaskAC(taskId, domainModel, todolistId));
                        dispatch(setAppStatusAC({status: "succeeded"}));
                        dispatch(changeTaskEntityStatusAC(taskId, "succeeded", todolistId));
                    } else {
                        handleServerAppError(res.data, dispatch);
                    }
                })
                .catch(err => {
                    handleServerNetworkError(err, dispatch);
                })
                .finally(() => {
                    dispatch(changeTaskEntityStatusAC(taskId, "idle", todolistId));
                })
        }
