import {ItemInterface} from "../Item";
import "./List.css"
import "../Form.css"
import { TASKTYPE } from "../TaskStatus"

export interface ListInterface {
    id: number,
    title: string,
    type: TASKTYPE,
    items: ItemInterface[]
}

const List = (props: { listId: number, listTitle: string, listType: TASKTYPE, listItems: ItemInterface[], listInterface: ListInterface, onChooseList: Function, items: ItemInterface[] }) => {
    const listItem: ListInterface = {
        id: props.listId,
        title: props.listTitle,
        type: props.listType,
        items: props.listItems
    }

    const handleClick = () => {
        props.onChooseList(listItem, props.items);
    }

    return (
        <li className="list__list">
            <button className="item-button-add" type="submit" onClick={handleClick}>{listItem.title}</button>
        </li>
    )
}

export default List;