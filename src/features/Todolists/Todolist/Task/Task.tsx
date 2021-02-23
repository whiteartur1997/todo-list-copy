import { Checkbox, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import React, { ChangeEvent, useCallback } from 'react'
import { TaskStatuses, TaskType } from '../../../../api/todolists-api'
import { EditableSpan } from '../../../../components/EditableSpan/EditableSpan'

export type TaskPropsType = {
    task: TaskType
    todolistId: string
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = useCallback(() => props.removeTask(props.task.id, props.todolistId), [props.task.id, props.todolistId]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }, [props.task.id, props.todolistId]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }, [props.task.id, props.todolistId]);

    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox
            disabled={props.task.entityStatus === "loading"}
            checked={props.task.status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan disabled={props.task.entityStatus === "loading"} value={props.task.title} onChange={onTitleChangeHandler} />
        <IconButton disabled={props.task.entityStatus === "loading"} onClick={onClickHandler}>
            <Delete />
        </IconButton>
    </div>
})
