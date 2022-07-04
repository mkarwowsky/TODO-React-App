import Item from "./Item";
import {ItemInterface} from './Item';

import './ItemsList.css'
import React, {useEffect} from "react";

const ItemsList = (props: {
    items: ItemInterface[],
    amountOfItems: number,
    onItemStatusClickUpdate: Function,
    onItemClickRevealUpdate: Function,
    onItemKeyPressRevealUpdate: Function,
    onItemBlockNoteUpdate: Function
}) => {
    return (
        <li className="items-list__template">
            {props.items.map((item, index) => (
                <ol key={index} id={item.id.toString()}>
                    <Item
                        tabIndex={0}
                        itemInterface={item}
                        onItemStatusClickUpdate={props.onItemStatusClickUpdate}
                        onItemClickRevealUpdate={props.onItemClickRevealUpdate}
                        onItemKeyPressRevealUpdate={props.onItemClickRevealUpdate}
                        onItemBlockNoteUpdate={props.onItemBlockNoteUpdate}
                    />
                </ol>
            ))}
        </li>
    )
}

export default ItemsList;

// const [items, setItems] = useState<ItemInterface[]>([]);
//
// const onItemStatusClickUpdate = (itemId: number) => {
//     const findItem = items.findIndex(itemTooDo => itemTooDo.id === itemId);
//     items[findItem].type === TASKTYPE.TODO ? items[findItem].type = TASKTYPE.DONE : items[findItem].type = TASKTYPE.TODO
//     setItems(items);
// }
//
// const onItemClickRevealUpdate = (itemId: number) => {
//     const findItem = items.findIndex(itemTooDo => itemTooDo.id === itemId);
//     items[findItem].reveal = !items[findItem].reveal;
//     setItems(items);
// }
//
// const onItemBlockNoteUpdate = (itemId: number, blockNote: string) => {
//     const findItem = items.findIndex(itemTooDo => itemTooDo.id === itemId);
//     items[findItem].blockNote = blockNote;
//     setItems(items);
// }
//
// const addItemHandler = (item: ItemInterface) => {
//     setItems((items) => {
//         return [...items, item];
//     })
// }
