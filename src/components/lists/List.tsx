import {ItemInterface} from "../Item";
import {TASKTYPE} from "../TaskStatus"
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai"
import {useState} from "react";

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
    lists: ListInterface[],
    onEditListTitle: Function,
}) => {
    const listItem: ListInterface = {
        id: props.listInterface.id,
        title: props.listInterface.title,
        type: props.listInterface.type,
        items: props.listInterface.items
    }
    const [enteredListTitle, setEnteredListTitle] = useState<string>('');
    const [isListEdit, setIsListEdit] = useState<boolean>(false);

    const titleChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
        setEnteredListTitle(event.currentTarget.value);
    };

    const handleClick = () => props.onChooseList(listItem, props.items);

    const onHandleDeleteList = () => {
        const findItem = props.lists.findIndex(itemTooDo => itemTooDo.id === listItem.id);
        props.lists[findItem].type = TASKTYPE.DELETED;
        props.onDeleteListUpdate(listItem.id, props.listInterface.type, props.lists, props.onDeleteListUpdate);
    }

    const submitHandler = () => {
        const findItem = props.lists.findIndex(itemTooDo => itemTooDo.id === listItem.id);
        props.lists[findItem].title = enteredListTitle;
        console.log(enteredListTitle);
        props.onEditListTitle(listItem.id, props.listInterface.title, props.lists, props.onEditListTitle);
    }

    return (
        <div className="list__list">
            <div className="list__list-items">
                <div className="item-button-list" onClick={handleClick}>{props.listInterface.title}</div>
                {props.buildInList === false && <div className="task-status-button" onClick={onHandleDeleteList}><AiOutlineDelete/></div>}
                {props.buildInList === false && <button className="task-status-button" onClick={() => setIsListEdit(!isListEdit)} type="submit"><AiOutlineEdit/></button>}
            </div>

            {isListEdit && !props.buildInList &&
                <div className="form__input-edit-item">
                    <form onSubmit={submitHandler}>
                        <div>
                            <input className="form__input"
                                   type="text"
                                   placeholder="Title"
                                   minLength={2}
                                   maxLength={15}
                                   value={enteredListTitle}
                                   onChange={titleChangeHandler}
                            />
                        </div>
                    </form>
                </div>}
        </div>
    )
}

export default List;