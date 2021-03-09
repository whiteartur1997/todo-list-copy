import {setTodolistsAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";
import {
    addTaskAC,
    updateTaskAC,
    removeTaskAC,
    setTasksAC,
    tasksReducer,
    TasksStateType
} from "./tasks-reducer";

let todolistId1: string;
let todolistId2: string;
let startState: TasksStateType = {};

beforeEach(() => {
    startState = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "i89123", addedDate: "", deadline: "", description: "", order: 0, startDate: "", priority: TaskPriorities.Hi, entityStatus: "loading" },
            { id: "2", title: "HTML", status: TaskStatuses.Completed, todoListId: "i89123", addedDate: "", deadline: "", description: "", order: 1, startDate: "", priority: TaskPriorities.Low, entityStatus: "loading" },
            { id: "3", title: "JS", status: TaskStatuses.Draft, todoListId: "i89123", addedDate: "", deadline: "", description: "", order: 2, startDate: "", priority: TaskPriorities.Middle, entityStatus: "loading" },
        ],
        "todolistId2": [
            { id: "356", title: "bread", status: TaskStatuses.InProgress, todoListId: "aa88982q", addedDate: "", deadline: "", description: "", order: 0, startDate: "", priority: TaskPriorities.Hi, entityStatus: "loading" },
            { id: "311tt", title: "milk", status: TaskStatuses.InProgress, todoListId: "aa88982q", addedDate: "", deadline: "", description: "", order: 0, startDate: "", priority: TaskPriorities.Hi, entityStatus: "loading" },
            { id: "356ee", title: "bread", status: TaskStatuses.InProgress, todoListId: "aa88982q", addedDate: "", deadline: "", description: "", order: 0, startDate: "", priority: TaskPriorities.Hi, entityStatus: "loading" },
        ]
    }
})

test("correct keys should be created in the object", () => {
    const action = setTodolistsAC([
        { id: "tl1", title: 'TL1', order: 0, addedDate: "" },
        { id: "tl2", title: 'TL2', order: 1, addedDate: "" },
    ]);

    const endState = tasksReducer({}, action);

    expect(endState["tl2"]).toBeDefined();
    expect(endState["tl2"]).toStrictEqual([]);
    expect(Object.keys(endState).length).toBe(2);
})

test("tasks should be added to right todolistId", () => {
    const action = setTasksAC("tl1", [
        { id: "7651", title: "Redux", status: TaskStatuses.New, todoListId: "tl1", addedDate: "", deadline: "", description: "", order: 0, startDate: "", priority: TaskPriorities.Hi, entityStatus: "idle" },
        { id: "7651234", title: "Thunk", status: TaskStatuses.New, todoListId: "tl1", addedDate: "", deadline: "", description: "", order: 0, startDate: "", priority: TaskPriorities.Hi, entityStatus: "idle" },
    ])

    const endState = tasksReducer(startState, action);

    expect(Object.keys(endState).length).toBe(3);
    expect(endState["tl1"][0].title).toBe("Redux");
    expect(endState["todolistId1"][0].title).toBe("CSS");
})

test("Task should be added", () => {
    const action = addTaskAC({
        title: "Iphone",
        priority: TaskPriorities.Low,
        startDate: "",
        order: 2,
        description: "",
        id: "8927",
        deadline: "",
        addedDate: "",
        todoListId: "todolistId1",
        status: TaskStatuses.New,
        entityStatus: "idle"
    })

    const endState = tasksReducer(startState, action);

    expect(endState["todolistId1"].length).toBe(4);
    expect(endState["todolistId2"].length).toBe(3);
    expect(endState["todolistId1"][0].title).toBe("Iphone");
})

test("Correct task should be removed", () => {
    const action = removeTaskAC("311tt", "todolistId2");

    const endState = tasksReducer(startState, action);

    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId1"].length).toBe(3);
})

test("Correct task should change it's title", () => {
    const action = updateTaskAC("2", {title: "React"}, "todolistId1");

    const endState = tasksReducer(startState, action);

    expect(endState["todolistId1"][1].title).toBe("React");
    expect(endState["todolistId2"][1].title).toBe("milk");
    expect(endState["todolistId1"].length).toEqual(endState["todolistId2"].length)
})

test("Correct task should change it's status", () => {
    const action = updateTaskAC("311tt", {status: TaskStatuses.Completed}, "todolistId2");

    const endState = tasksReducer(startState, action);

    expect(endState["todolistId2"][1].status).toBe(2);
    expect(endState["todolistId2"][0].status).toBe(1);
    expect(endState["todolistId2"][2].status).toBe(1);
})
