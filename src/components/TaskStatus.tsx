import {useEffect, useState} from 'react';
import './TaskStatus.css'
import './Item.css'
import {MdOutlineDoneOutline} from "react-icons/md"

export enum TASKTYPE {
    TODO = "TODO",
    DONE = "DONE",
    BLOCKED = "BLOCKED",
    DELETED = "DELETED",
    ALL = "ALL",
    NORMAL = "NORMAL"
}

const TaskStatus = (props: { itemId: number, itemStatus: TASKTYPE}) => {
    const [isDone, setIsDone] = useState("task-status-button-todo")

    useEffect(() => {
        (props.itemStatus === TASKTYPE.DONE) ? setIsDone("task-status-button-todo") : setIsDone("task-status-button");
    })

    return (
        <div>
            <div className={isDone}>
                <b>{(props.itemStatus === TASKTYPE.DONE) ? <MdOutlineDoneOutline/> : 'TODO'}</b>
            </div>
        </div>
    )
}

export default TaskStatus;


