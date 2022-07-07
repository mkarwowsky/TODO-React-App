import './Item.css'
import './TaskStatus.css'

import TaskStatus, {TASKTYPE} from "./TaskStatus";
import Chart from "./charts/Chart";
import {useEffect, useState} from "react";
import BlockNote from "./BlockNote";
import {FiLock, FiUnlock} from "react-icons/fi"
import {AiOutlineDelete} from "react-icons/ai"

export interface ItemInterface {
    id: number,
    title: string,
    description: string,
    blockNote?: string,
    type: TASKTYPE,
    reveal: boolean
}

const Item = (props: {
    tabIndex: number,
    itemInterface: ItemInterface,
    onItemStatusClickUpdate: Function,
    onItemClickRevealUpdate: Function,
    onItemKeyPressRevealUpdate: Function,
    onItemBlockNoteUpdate: Function,
    onItemDeleteUpdate: Function
}) => {
    const [status, setStatus] = useState(props.itemInterface.type);
    const [isDone, setIsDone] = useState("item__item-header-done");
    const [isBlocked, setIsBlocked] = useState("task-status-button-blocked")
    const [isDeleted, setIsDeleted] = useState("")

    useEffect(() => {
        props.onItemStatusClickUpdate(props.itemInterface.id, status, props.onItemStatusClickUpdate);
    })

    useEffect(() => {
        status === TASKTYPE.DONE ? setIsDone("item__item-header-done") : (status === TASKTYPE.BLOCKED) ? setIsDone("item__item-header-blocked") : setIsDone("item__item-header");
        status === TASKTYPE.BLOCKED ? setIsBlocked("task-status-button-blocked") : setIsBlocked("task-status-button");
    })

    const onHandleIsDone = () => {
        if (props.itemInterface.type === TASKTYPE.BLOCKED) return 0;
        (props.itemInterface.type === (TASKTYPE.TODO)) ? setStatus(TASKTYPE.DONE) : setStatus(TASKTYPE.TODO);
        props.onItemStatusClickUpdate(props.itemInterface.id, status, props.onItemStatusClickUpdate);
    }

    const onHandleIsBlock = () => {
        (status === (TASKTYPE.TODO)) ? setStatus(TASKTYPE.BLOCKED) : setStatus(TASKTYPE.TODO);
        props.onItemStatusClickUpdate(props.itemInterface.id, status, props.onItemStatusClickUpdate);
    }

    const onHandleDeleteItem = () => {
        setStatus(TASKTYPE.DELETED);
        setIsDeleted("task-status-button-deleted");
        props.onItemDeleteUpdate(props.itemInterface.id, props.itemInterface.type, props.onItemDeleteUpdate);
    }

    const todoItem: ItemInterface = {
        id: props.itemInterface.id,
        title: props.itemInterface.title,
        type: props.itemInterface.type,
        description: props.itemInterface.description,
        blockNote: props.itemInterface.blockNote,
        reveal: props.itemInterface.reveal
    }

    return (
        <div className={isDeleted} key={Math.random()}>
            <div className="item__template">
                <div className="item__header">
                    <div onDoubleClick={onHandleIsDone}
                         className={isDone}>
                        <div className="item__statuses">
                            <TaskStatus
                                itemId={todoItem.id}
                                itemStatus={status}
                            />
                            <button onClick={onHandleIsBlock}
                                    className={isBlocked}>
                                <div>{(status === TASKTYPE.BLOCKED) ? <FiLock/> : <FiUnlock/>}</div>
                            </button>
                            <button onClick={onHandleDeleteItem}
                                    className={isBlocked}>
                                <div><AiOutlineDelete/></div>
                            </button>
                        </div>
                        <div className="item__item-header-title">{todoItem.title}</div>
                    </div>
                    <BlockNote itemId={todoItem.id}
                               itemStatus={status}
                               blockNote={todoItem.blockNote}
                               onItemBlockNoteUpdate={props.onItemBlockNoteUpdate}/>
                    <div className="item__item-description">
                        <Chart
                            tabIndex={props.tabIndex}
                            itemId={todoItem.id}
                            revealStatus={todoItem.reveal}
                            description={todoItem.description}
                            onItemClickRevealUpdate={props.onItemClickRevealUpdate}
                            onItemKeyPressRevealUpdate={props.onItemKeyPressRevealUpdate}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Item;