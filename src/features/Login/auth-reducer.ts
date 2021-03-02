import { Dispatch } from "redux";
import { authAPI, LoginUserRequestType } from "../../api/todolists-api";
import { setAppStatusAC } from "../../app/app-reducer";
import { handleServerAppError, handleServerNetworkError } from "../../utils/error-utils";

const initialState = {
    isLoggedIn: false
}


export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'LOGIN/SET-IS-LOGIN':
            return { ...state, isLoggedIn: action.isLoggedIn }
        default:
            return state;
    }

}

export const loginUser = (loginData: LoginUserRequestType) => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC("loading"));
        const res = await authAPI.login(loginData);
        if (res.data.resultCode === 0) {
            dispatch(loginUserAC(true));
            dispatch(setAppStatusAC("succeeded"));
        } else {
            handleServerAppError(res.data, dispatch);
        }
    } catch (err) {
        handleServerNetworkError(err, dispatch);
    }
}

export const logoutUser = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC("loading"));
        const res = await authAPI.logout();
        if (res.data.resultCode === 0) {
            dispatch(loginUserAC(false));
        } else {
            handleServerAppError(res.data, dispatch);
        }
    } catch (err) {
        handleServerNetworkError(err, dispatch);
    } finally {
        dispatch(setAppStatusAC("idle"));
    }
}

export const loginUserAC = (isLoggedIn: boolean) => ({ type: 'LOGIN/SET-IS-LOGIN', isLoggedIn } as const)

// types
type InitialStateType = typeof initialState;
type ActionsType = ReturnType<typeof loginUserAC>;