import React from 'react'
import { Provider } from "react-redux"
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { v1 } from 'uuid'
import { TaskPriorities, TaskStatuses } from '../../api/todolists-api'
import { appReducer } from '../../app/app-reducer'
import { authReducer } from '../../features/Login/auth-reducer'
import { AppRootStateType } from './../../app/store'
import { tasksReducer } from './../../features/Todolists/tasks-reducer'
import { todolistsReducer } from './../../features/Todolists/todolists-reducer'

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer
})

const initialGlobalState: AppRootStateType = {
  todolists: [
    { id: "todolistId1", title: "What to learn", filter: "all", order: 0, addedDate: "", entityStatus: "idle" },
    { id: "todolistId2", title: "What to buy", filter: "all", order: 1, addedDate: "", entityStatus: "loading" }
  ],
  tasks: {
    ["todolistId1"]: [
      {
        id: v1(),
        title: "HTML&CSS",
        addedDate: "",
        order: 0,
        deadline: "",
        description: "",
        priority: TaskPriorities.Middle,
        startDate: "",
        status: TaskStatuses.InProgress,
        todoListId: "todolistId1",
        entityStatus: "idle"
      },
      {
        id: v1(),
        title: "JS",
        addedDate: "",
        order: 1,
        deadline: "",
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        status: TaskStatuses.New,
        todoListId: "todolistId1",
        entityStatus: "loading"
      }
    ],
    ["todolistId2"]: [
      {
        id: v1(),
        title: "Milk",
        addedDate: "",
        order: 0,
        deadline: "",
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        status: TaskStatuses.Completed,
        todoListId: "todolistId2",
        entityStatus: "idle"
      },
      {
        id: v1(),
        title: "Bread",
        addedDate: "",
        order: 0,
        deadline: "",
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        status: TaskStatuses.InProgress,
        todoListId: "todolistId2",
        entityStatus: "idle"
      }
    ]
  },
  app: {
    status: "idle",
    error: null,
    isInitialized: false
  },
  auth: {
    isLoggedIn: false
  }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunk));


export const ReduxStoreProviderDecorator = (storyFn: any) => {
  return <Provider store={storyBookStore}>
    {storyFn()}
  </Provider>
}