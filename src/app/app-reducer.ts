import { Dispatch } from "redux";
import { authAPI } from "../api/todolists-api";
import { loginUserAC } from "../features/Login/auth-reducer";
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils";

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as string | null,
  isInitialized: false as boolean
}

export const appReducer = (state: InitialAppReducerStateType = initialState, action: ActionsType): InitialAppReducerStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return { ...state, status: action.status };
    case 'APP/SET-ERROR':
      return { ...state, error: action.error };
    case 'APP/SET-INIT':
      return { ...state, isInitialized: action.isInit };
    default:
      return state
  }
}

// thunks
export const initializeApp = () => async (dispatch: Dispatch) => {
  try {
    const res = await authAPI.me();
    if (res.data.resultCode === 0) {
      dispatch(loginUserAC(true));
    } else {
      handleServerAppError(res.data, dispatch);
    }
  } catch (err) {
    handleServerNetworkError(err, dispatch);
  } finally {
    dispatch(setAppInitAC(true));
  }
}


// actions
export const setAppStatusAC = (status: RequestStatusType) => ({ type: 'APP/SET-STATUS', status } as const);
export const setAppErrorAC = (error: string | null) => ({ type: 'APP/SET-ERROR', error } as const);
export const setAppInitAC = (isInit: boolean) => ({ type: 'APP/SET-INIT', isInit } as const);

// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type InitialAppReducerStateType = typeof initialState;
type ActionsType = ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof setAppInitAC>;