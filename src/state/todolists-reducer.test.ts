import {
    addTodolistAC, changeTodolistTitleAC,
    removeTodolistAC,
    setTodolistsAC,
    TodolistDomainType,
    todolistsReducer
} from "./todolists-reducer";
import {v1} from "uuid";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType> = [];

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        { id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0 },
        { id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0 },
    ]
})

test("Should receive todolists", () => {
    const action = setTodolistsAC(startState);

    const endState = todolistsReducer([], action);

    expect(endState.length).toBe(2);
    expect(endState[1].title).toBe("What to buy");
})

test("Right todolist should be removed", () => {
    const action = removeTodolistAC(todolistId1);

    const endState = todolistsReducer(startState, action);

    expect(endState.length).toBe(1);
    expect(endState[0].title).toBe("What to buy");
})

test("New todolist should be added", () => {
    const action = addTodolistAC({addedDate: "", order: 1, title: "New todo", id: "11324"});

    const endState = todolistsReducer(startState, action);

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe("New todo");
})

test("Correct todolist should change it's title", () => {
    const action = changeTodolistTitleAC(todolistId2, "Lorem");

    const endState = todolistsReducer(startState, action);

    expect(endState[1].title).toBe("Lorem");
    expect(endState[0].title).toBe("What to learn");
})