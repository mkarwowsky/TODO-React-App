import {ItemInterface} from "../Item";
import {TASKTYPE} from "../TaskStatus"
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai"
import {useState} from "react";

import "./List.css"
import "../Form.css"
import '../TaskStatus.css'
import '../Item.css'
import {makeStyles} from "@mui/styles";

export interface ListInterface {
    id: number,
    title: string,
    type: TASKTYPE,
    items: ItemInterface[]
}

const useStyles = makeStyles(({
    list__list: {
        display: "flex",
        flexDirection: "column",
        margin: "0.75rem 0rem 0 0.5rem"
    },
    list__listItems: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center"
    },
    itemButtonList: {
        alignItems: "center",
        appearance: "none",
        backgroundColor: "#fff",
        borderRadius: "24px",
        borderStyle: "none",
        boxShadow:
            "rgba(0, 0, 0, .2) 0 3px 5px -1px, rgba(0, 0, 0, .14) 0 6px 10px 0, rgba(0, 0, 0, .12) 0 1px 18px 0",
        boxSizing: "border-box",
        color: "#3c4043",
        cursor: "pointer",
        display: "inline-flex",
        fill: "currentcolor",
        fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
        fontSize: "14px",
        fontWeight: "500",
        height: "24px",
        justifyContent: "center",
        letterSpacing: ".25px",
        lineHeight: "normal",
        maxWidth: "60%",
        overflow: "visible",
        padding: "2px 24px",
        position: "relative",
        textAlign: "center",
        textTransform: "none",
        transition:
            "box-shadow 280ms cubic-bezier(.4, 0, .2, 1), opacity 15ms linear 30ms, transform 270ms cubic-bezier(0, 0, .2, 1) 0ms",
        userSelect: "none",
        WebkitUserSelect: "none",
        touchAction: "manipulation",
        width: "80%",
        willChange: "transform, opacity",
        zIndex: 0,
        margin: "0 0.5rem 0 0"
    },
    taskStatusButton: {
        alignItems: "center",
        appearance: "none",
        backgroundColor: "#fff",
        borderRadius: "24px",
        borderStyle: "none",
        boxShadow:
            "rgba(0, 0, 0, .2) 0 3px 5px -1px, rgba(0, 0, 0, .14) 0 6px 10px 0, rgba(0, 0, 0, .12) 0 1px 18px 0",
        boxSizing: "border-box",
        color: "#3c4043",
        cursor: "pointer",
        display: "inline-flex",
        fill: "currentcolor",
        fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
        fontSize: "14px",
        fontWeight: '500',
        height: "24px",
        justifyContent: "center",
        letterSpacing: ".25px",
        lineHeight: "normal",
        maxWidth: "100%",
        overflow: "visible",
        padding: "2px 0.5rem",
        position: "relative",
        textAlign: "center",
        textTransform: "none",
        transition:
            "box-shadow 280ms cubic-bezier(.4, 0, .2, 1), opacity 15ms linear 30ms, transform 270ms cubic-bezier(0, 0, .2, 1) 0ms",
        userSelect: "none",
        WebkitUserSelect: "none",
        touchAction: "manipulation",
        width: "auto",
        willChange: "transform, opacity",
        zIndex: 0,
        margin: "0 0.5rem 0 0"
    },
    form__inputEditItem: {marginTop: "0.5rem"},
    form__input: {
        fontFamily: "'Roboto', sans-serif",
        color: "#333",
        fontSize: "0.8rem",
        margin: "0 auto",
        padding: "0.25rem 0.5rem",
        borderRadius: "0.2rem",
        backgroundColor: "rgb(255, 255, 255)",
        border: "none",
        width: "80%",
        display: "block",
        borderBottom: "0.3rem solid transparent",
        transition: "all 0.3s"
    }
}));


const List = (props: {
    listInterface: ListInterface,
    onChooseList: Function,
    onDeleteListUpdate: Function,
    buildInList: boolean,
    items: ItemInterface[],
    lists: ListInterface[],
    onEditListTitle: Function,
}) => {
    const classes = useStyles();
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
        <div className={classes.list__list}>
            <div className={classes.list__listItems}>
                <div className={classes.itemButtonList} onClick={handleClick}>{props.listInterface.title}</div>
                {props.buildInList === false &&
                    <div className={classes.taskStatusButton} onClick={onHandleDeleteList}><AiOutlineDelete/></div>}
                {props.buildInList === false &&
                    <button className={classes.taskStatusButton} onClick={() => setIsListEdit(!isListEdit)}
                            type="submit"><AiOutlineEdit/></button>}
            </div>

            {isListEdit && !props.buildInList &&
                <div className={classes.form__inputEditItem}>
                    <form onSubmit={submitHandler}>
                        <div>
                            <input className={classes.form__input}
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