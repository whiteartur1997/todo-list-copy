import { Dispatch } from 'redux';
import { v1 } from 'uuid';
import { todolistsAPI, TodolistType } from '../api/todolists-api';

type ActionsType = ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof setTodolistsAC>;

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            return action.todolists.map((tl) => {
                return { ...tl, filter: "all" }
            })
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string) => {
    return { type: 'REMOVE-TODOLIST', id: todolistId } as const;
}
export const addTodolistAC = (title: string) => {
    return { type: 'ADD-TODOLIST', title: title, todolistId: v1() } as const;
}
export const changeTodolistTitleAC = (id: string, title: string) => {
    return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title } as const;
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter } as const;
}

export const setTodolistsAC = (todolists: TodolistType[]) => {
    return { type: 'SET-TODOLISTS', todolists } as const;
}

export const getTodolistsTC = () => (dispatch: Dispatch) => {
    // 1. side effects 
    todolistsAPI.getTodolists()
        .then(res => {
            // 2. dispatch actions
            dispatch(setTodolistsAC(res.data))
        })
}

export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTodolist(todolistId)
        .then(res => {
            if (res.data.resultCode === 0) dispatch(removeTodolistAC(todolistId));
        })
}

export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) dispatch(addTodolistAC(title));
        })
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistsAPI.updateTodolist(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC(todolistId, title));
            }
        })
}