const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as string | null
}

export const appReducer = (state: InitialAppReducerStateType = initialState, action: ActionsType): InitialAppReducerStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return { ...state, status: action.status };
    case 'APP/SET-ERROR':
      return { ...state, error: action.error };
    default:
      return state
  }
}

// actions
export const setAppStatusAC = (status: RequestStatusType) => ({ type: 'APP/SET-STATUS', status } as const);
export const setAppErrorAC = (error: string | null) => ({ type: 'APP/SET-ERROR', error } as const);

// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type InitialAppReducerStateType = typeof initialState;
type ActionsType = ReturnType<typeof setAppStatusAC> | ReturnType<typeof setAppErrorAC>;