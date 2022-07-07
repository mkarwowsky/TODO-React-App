import {ItemInterface} from "../Item";
import "./List.css"
import "../Form.css"
import '../TaskStatus.css'
import '../Item.css'
import {TASKTYPE} from "../TaskStatus"
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai"
import {useState} from "react";

export interface ListInterface {
    id: number,
    title: string,
    type: TASKTYPE,
    items: ItemInterface[]
}

const List = (props: {
    listId: number,
    listTitle: string,
    listType: TASKTYPE,
    listItems: ItemInterface[],
    listInterface: ListInterface,
    onChooseList: Function,
    onDeleteList: Function,
    buildInList: boolean,
    items: ItemInterface[]
}) => {
    const [isDeleted, setIsDeleted] = useState("")
    const [status, setStatus] = useState(props.listType);

    const listItem: ListInterface = {
        id: props.listId,
        title: props.listTitle,
        type: props.listType,
        items: props.listItems
    }

    const handleClick = () => {
        props.onChooseList(listItem, props.items);
    }

    const handleDelete = () => {
        setIsDeleted("task-status-button-deleted");
        setStatus(TASKTYPE.DELETED);
        listItem.type = status;
        props.onDeleteList(listItem, props.onDeleteList);
    }

    return (
        <div className={isDeleted}>
            <li key={Math.random()} className="list__list">
                <div className="list__list-items">
                    <div className="item-button-list" onClick={handleClick}>{listItem.title}</div>
                    {props.buildInList === false &&
                        <div className="task-status-button" onClick={handleDelete}><AiOutlineDelete/></div>}
                    {props.buildInList === false &&
                        <div className="task-status-button" onClick={handleDelete}><AiOutlineEdit/></div>}
                </div>
            </li>
        </div>
    )
}

export default List;