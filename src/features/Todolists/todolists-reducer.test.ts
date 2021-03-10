import { v1 } from "uuid";
import {
    addTodolistAC, changeTodolistEntityStatusAC, changeTodolistTitleAC,
    removeTodolistAC,
    setTodolistsAC,
    TodolistDomainType,
    todolistsReducer
} from "./todolists-reducer";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType> = [];

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        { id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0, entityStatus: "idle" },
        { id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0, entityStatus: "idle" },
    ]
})

test("Should receive todolists", () => {
    const action = setTodolistsAC({todolists: startState});

    const endState = todolistsReducer([], action);

    expect(endState.length).toBe(2);
    expect(endState[1].title).toBe("What to buy");
})

test("Right todolist should be removed", () => {
    const action = removeTodolistAC({id: todolistId1});

    const endState = todolistsReducer(startState, action);

    expect(endState.length).toBe(1);
    expect(endState[0].title).toBe("What to buy");
})

test("New todolist should be added", () => {
    const action = addTodolistAC({ todolist: {addedDate: "", order: 1, title: "New todo", id: "11324"} });

    const endState = todolistsReducer(startState, action);

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe("New todo");
})

test("Correct todolist should change it's title", () => {
    const action = changeTodolistTitleAC({id: todolistId2, title: "Lorem"});

    const endState = todolistsReducer(startState, action);

    expect(endState[1].title).toBe("Lorem");
    expect(endState[0].title).toBe("What to learn");
})

test("Correct todolist should change it's status", () => {
    const action = changeTodolistEntityStatusAC({id: todolistId2, entityStatus: "loading"});

    const endState = todolistsReducer(startState, action);

    expect(endState[1].entityStatus).toBe("loading");
    expect(endState[0].entityStatus).toBe("idle");
})