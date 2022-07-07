import Item, {ItemInterface} from "../Item";
import React from "react";

const TodoList = (props: {
    items: ItemInterface[],
    amountOfItems: number,
    onItemStatusClickUpdate: Function,
    onItemClickRevealUpdate: Function,
    onItemKeyPressRevealUpdate: Function,
    onItemBlockNoteUpdate: Function,
    onItemDeleteUpdate: Function
}) => {

    return (
        <div>
            <li className="items-list__template">
                {props.items.map((item, index) => (
                    <ol key={index} id={item.id.toString()}>
                        <Item
                            tabIndex={0}
                            itemInterface={item}
                            onItemStatusClickUpdate={props.onItemStatusClickUpdate}
                            onItemClickRevealUpdate={props.onItemClickRevealUpdate}
                            onItemKeyPressRevealUpdate={props.onItemKeyPressRevealUpdate}
                            onItemBlockNoteUpdate={props.onItemBlockNoteUpdate}
                            onItemDeleteUpdate={props.onItemDeleteUpdate}
                        />
                    </ol>
                ))}
            </li>
        </div>
    )
}

export default TodoList;