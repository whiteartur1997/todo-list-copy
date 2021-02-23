import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react/types-6-0";
import { TaskPriorities, TaskStatuses } from "../../../../api/todolists-api";
import { Task, TaskPropsType } from "./Task";

export default {
    title: 'Todolist/Task',
    component: Task,
} as Meta;

const removeCallback = action("Remove button inside task clicked");
const changeStatusCallback = action("Status cahnged inside task");
const changeTitleCallback = action("Title cahnged inside task");

const Template: Story<TaskPropsType> = (args) => {
    return <Task {...args} />
}

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    changeTaskStatus: changeStatusCallback,
    changeTaskTitle: changeTitleCallback,
    removeTask: removeCallback,
    task: {
        id: "1",
        status: TaskStatuses.Completed,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        title: "React",
        startDate: "",
        priority: TaskPriorities.Middle,
        todoListId: "TodolistId1",
        entityStatus: "idle"
    },
    todolistId: "TodolistId1"
}

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    changeTaskStatus: changeStatusCallback,
    changeTaskTitle: changeTitleCallback,
    removeTask: removeCallback,
    task: {
        id: "1",
        status: TaskStatuses.New,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        title: "Yarn",
        startDate: "",
        priority: TaskPriorities.Middle,
        todoListId: "TodolistId2",
        entityStatus: "idle"
    },
    todolistId: "TodolistId2"
}

export const TaskIsDoneDisabledExample = Template.bind({});
TaskIsDoneDisabledExample.args = {
    changeTaskStatus: changeStatusCallback,
    changeTaskTitle: changeTitleCallback,
    removeTask: removeCallback,
    task: {
        id: "2",
        status: TaskStatuses.Completed,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        title: "Disable me",
        startDate: "",
        priority: TaskPriorities.Middle,
        todoListId: "TodolistId1",
        entityStatus: "loading"
    },
    todolistId: "TodolistId2"
}

