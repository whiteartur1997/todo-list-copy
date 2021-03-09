import { appReducer, InitialAppReducerStateType, setAppErrorAC, setAppStatusAC } from "./app-reducer";

let startState: InitialAppReducerStateType;

beforeEach(() => {
  startState = {
    error: null,
    status: "idle",
    isInitialized: false
  };
})

test("Status of the app should be loading", () => {
  const action = setAppStatusAC({status: "loading"});
  const endState = appReducer(startState, action);

  expect(endState.status).toBe("loading");
  expect(endState.error).toBe(null);
})

test("Error of the app should be fafafa", () => {
  const action = setAppErrorAC({error: "fafafa"});
  const endState = appReducer(startState, action);

  expect(endState.error).toBe("fafafa");
  expect(endState.status).toBe("idle");
})