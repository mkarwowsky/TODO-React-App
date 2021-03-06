import {useEffect, useState} from 'react';
import {MdOutlineDoneOutline} from "react-icons/md"

import './TaskStatus.css'
import './Item.css'

export enum TASKTYPE {
    TODO = "TODO",
    DONE = "DONE",
    BLOCKED = "BLOCKED",
    DELETED = "DELETED",
    ALL = "ALL",
    NORMAL = "NORMAL"
}

const TaskStatus = (props: { itemId: number, itemStatus: TASKTYPE}) => {
    const [isDone, setIsDone] = useState(true);

    const getItemClass = () => {
        if (isDone) {
            return "task-status-button"
        } else {
            return "task-status-button-todo"
        };
    }

    useEffect(() => {
        (props.itemStatus === TASKTYPE.DONE) ? setIsDone(false) : setIsDone(true);
    })

    return (
        <div>
            <div className={getItemClass()}>
                <b>{(props.itemStatus === TASKTYPE.DONE) ? <MdOutlineDoneOutline/> : 'TODO'}</b>
            </div>
        </div>
    )
}

export default TaskStatus;


