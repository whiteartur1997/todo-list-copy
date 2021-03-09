import { Dispatch } from "redux";
import { authAPI } from "../api/todolists-api";
import { loginUserAC } from "../features/Login/auth-reducer";
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as string | null,
  isInitialized: false as boolean
}

const slice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status
    },
    setAppErrorAC(state, action: PayloadAction<{error: string | null}>) {
      state.error = action.payload.error
    },
    setAppInitAC(state, action: PayloadAction<{isInit: boolean}>) {
      state.isInitialized = action.payload.isInit
    }
  }
});

export const appReducer = slice.reducer;
export const {setAppStatusAC, setAppErrorAC, setAppInitAC} = slice.actions;

// thunks
export const initializeApp = () => async (dispatch: Dispatch) => {
  try {
    const res = await authAPI.me();
    if (res.data.resultCode === 0) {
      dispatch(loginUserAC({value: true}));
    } else {
      handleServerAppError(res.data, dispatch);
    }
  } catch (err) {
    handleServerNetworkError(err, dispatch);
  } finally {
    dispatch(setAppInitAC({isInit: true}));
  }
}

// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type InitialAppReducerStateType = typeof initialState;