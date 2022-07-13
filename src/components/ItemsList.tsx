import Item from "./Item";
import {ItemInterface} from './Item';

import './ItemsList.css'

const ItemsList = (props: {
    items: ItemInterface[],
    amountOfItems: number,
    onItemStatusClickUpdate: Function,
    onItemClickRevealUpdate: Function,
    onItemKeyPressRevealUpdate: Function,
    onItemBlockNoteUpdate: Function,
    onItemDeleteUpdate: Function
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
                        onItemDeleteUpdate={props.onItemDeleteUpdate}
                    />
                </ol>
            ))}
        </li>
    )
}

export default ItemsList;