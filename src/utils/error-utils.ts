import { Dispatch } from "redux";
import { setAppErrorAC, setAppStatusAC } from "../app/app-reducer";
import { ResponseType } from "./../api/todolists-api";

export function handleServerAppError<D>(data: ResponseType<D>, dispatch: Dispatch<ActionsType>) {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]));
  } else {
    dispatch(setAppErrorAC("Some error occured!"))
  }
  dispatch(setAppStatusAC("failed"));
}

export function handleServerNetworkError(error: any, dispatch: Dispatch<ActionsType>) {
  dispatch(setAppErrorAC(error.message ? error.message : "Some error occured"));
  dispatch(setAppStatusAC("failed"));
}

type ActionsType = ReturnType<typeof setAppErrorAC> | ReturnType<typeof setAppStatusAC>;