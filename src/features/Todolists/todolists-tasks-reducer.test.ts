import {addTodolistAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TodolistType} from "../../api/todolists-api";

test("Ids should be equal", () => {
    const startTasksState = {};
    const startTodolistsState: TodolistDomainType[] = [];

    const action = addTodolistAC({todolist: {title: "New list", id: "id123", order: 0, addedDate: ""}});

    const endTasksState = tasksReducer(startTasksState, action);
    const endTodolistsState: TodolistType[] = todolistsReducer(startTodolistsState, action);

    expect(endTasksState["id123"]).toBeDefined();
    expect(Object.keys(endTasksState).length).toBe(1);
    expect(endTodolistsState.length).toBe(1);
})