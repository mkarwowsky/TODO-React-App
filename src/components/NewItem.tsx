import Form from "./Form";

import './NewItem.css'
import {TASKTYPE} from "./TaskStatus";

export interface NewItemInterface {
    id: number
    title: string,
    description: string,
    blockNote?: string,
    type: TASKTYPE,
    reveal: boolean
}

const NewItem = (props: { onAddItem: Function }) => {
    const saveItemDataHandler = (enteredItemData: NewItemInterface) => {
        const ItemData = {
            ...enteredItemData,
            id: Math.random().toString()
        };
        props.onAddItem(ItemData);
    };

    return (
        <div className="new-item__template">
            <Form onSaveItemData={saveItemDataHandler}/>
        </div>
    )
}

export default NewItem;