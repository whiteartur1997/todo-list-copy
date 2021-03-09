import { Dispatch } from "redux";
import { authAPI, LoginUserRequestType } from "../../api/todolists-api";
import { setAppStatusAC } from "../../app/app-reducer";
import { handleServerAppError, handleServerNetworkError } from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        loginUserAC(state, action: PayloadAction<{value: boolean}>) {
            state.isLoggedIn = action.payload.value
        }
    }
});

export const authReducer = slice.reducer;
export const {loginUserAC} = slice.actions;

export const loginUser = (loginData: LoginUserRequestType) => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC({status: "loading"}));
        const res = await authAPI.login(loginData);
        if (res.data.resultCode === 0) {
            dispatch(loginUserAC({value: true}));
            dispatch(setAppStatusAC({status: "succeeded"}));
        } else {
            handleServerAppError(res.data, dispatch);
        }
    } catch (err) {
        handleServerNetworkError(err, dispatch);
    }
}

export const logoutUser = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC({status: "loading"}));
        const res = await authAPI.logout();
        if (res.data.resultCode === 0) {
            dispatch(loginUserAC({value: false}));
        } else {
            handleServerAppError(res.data, dispatch);
        }
    } catch (err) {
        handleServerNetworkError(err, dispatch);
    } finally {
        dispatch(setAppStatusAC({status: "idle"}));
    }
}