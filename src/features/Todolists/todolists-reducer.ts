import { Dispatch } from 'redux';
import { todolistsAPI, TodolistType } from '../../api/todolists-api';
import { RequestStatusType, setAppErrorAC, setAppStatusAC } from '../../app/app-reducer';

// types
type ActionsType = ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>;
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOLISTS': return action.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
        case 'REMOVE-TODOLIST': return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST': return [{ ...action.todolist, filter: "all", entityStatus: "idle" }, ...state]
        case 'CHANGE-TODOLIST-TITLE': return state.map((tl) => action.id === tl.id ? { ...tl, title: action.title } : tl)
        case 'CHANGE-TODOLIST-FILTER': return state.map((tl) => action.id === tl.id ? { ...tl, filter: action.filter } : tl)
        default: return state;
    }
}

// actions
export const removeTodolistAC = (id: string) => ({ type: 'REMOVE-TODOLIST', id } as const)
export const addTodolistAC = (todolist: TodolistType) => ({ type: 'ADD-TODOLIST', todolist } as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
} as const)
export const setTodolistsAC = (todolists: TodolistType[]) => ({ type: 'SET-TODOLISTS', todolists } as const);

// thunks
export const getTodolistsTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"));
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data));
            dispatch(setAppStatusAC("succeeded"));
        })
        .catch(() => {
            setAppStatusAC("failed");
        })
}
export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.deleteTodolist(todolistId)
        .then(res => {
            if (res.data.resultCode === 0) dispatch(removeTodolistAC(todolistId));
        })
}
export const createTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"));
    todolistsAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item));
                dispatch(setAppStatusAC("succeeded"));
            } else {
                if (res.data.messages) {
                    dispatch(setAppErrorAC(res.data.messages[0]));
                } else {
                    dispatch(setAppErrorAC("Some error occured!"))
                }
                dispatch(setAppStatusAC("failed"));
            }
        })
        .catch(err => {
            dispatch(setAppErrorAC(err.message));
            dispatch(setAppStatusAC("failed"));
        })
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.updateTodolist(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC(todolistId, title));
            } else {
                if (res.data.messages) {
                    dispatch(setAppErrorAC(res.data.messages[0]));
                } else {
                    dispatch(setAppErrorAC("Some error occured!"))
                }
                dispatch(setAppStatusAC("failed"));
            }
        })
        .catch(err => {
            dispatch(setAppErrorAC(err.message));
            dispatch(setAppStatusAC("failed"));
        })
}