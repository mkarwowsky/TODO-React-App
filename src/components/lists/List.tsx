import {ItemInterface} from "../Item";
import {TASKTYPE} from "../TaskStatus"
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai"
import {useEffect} from "react";

import "./List.css"
import "../Form.css"
import '../TaskStatus.css'
import '../Item.css'

export interface ListInterface {
    id: number,
    title: string,
    type: TASKTYPE,
    items: ItemInterface[]
}

const List = (props: {
    listInterface: ListInterface,
    onChooseList: Function,
    onDeleteListUpdate: Function,
    buildInList: boolean,
    items: ItemInterface[],
    lists: ListInterface[]
}) => {
    const listItem: ListInterface = {
        id: props.listInterface.id,
        title: props.listInterface.title,
        type: props.listInterface.type,
        items: props.listInterface.items
    }

    const handleClick = () => {
        props.onChooseList(listItem, props.items);
    }

    const onHandleDeleteList = () => {
        const findItem = props.lists.findIndex(itemTooDo => itemTooDo.id === listItem.id);
        props.lists[findItem].type = TASKTYPE.DELETED;
        console.log(props.lists[findItem]);
        props.onDeleteListUpdate(listItem.id, props.listInterface.type, props.lists, props.onDeleteListUpdate);
    }

    return (
            <div className="list__list">
                <div className="list__list-items">
                    <div className="item-button-list" onClick={handleClick}>{props.listInterface.title}</div>
                    {props.buildInList === false &&
                        <div className="task-status-button" onClick={onHandleDeleteList}><AiOutlineDelete/></div>}
                    {props.buildInList === false &&
                        <div className="task-status-button" onClick={onHandleDeleteList}><AiOutlineEdit/></div>}
                </div>
            </div>
    )
}

export default List;