
const initialState = {
    isLoggedIn: false
 }


const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    return state;
}

const loginUserAC = () => ({type: 'LOGIN/SET-IS-LOGIN',})

// types
type InitialStateType = typeof initialState;
type ActionsType = any