import NewItem from "../NewItem";
import ItemsList from "../ItemsList";
import React, {useState} from "react";
import {ItemInterface} from "../Item";
import { ListInterface } from "../lists/List";

import "./Todos.css";
import { TASKTYPE } from "../TaskStatus";
import ListsList from "../lists/ListsList";
import ItemListCommunication from "../ItemListCommunication";

const INITIAL_ARRAY: ItemInterface[] = [
    {
        id: 1,
        title: "Zakupy",
        description: "Mąka, por, ziemniaki, cebula, rabarbar",
        type: TASKTYPE.TODO,
        reveal: false
    },
    {
        id: 2,
        title: "Piątek",
        description: "Lekarz i umówić dentystę.",
        type: TASKTYPE.BLOCKED,
        blockNote: "Lekarz odezwie się.",
        reveal: false
    },
    {
        id: 3,
        title: "Urodziny mamy",
        description: " Zadzwonić do cioci bernadetty i zapytać czy będzie coś przyrządzać. Zadzwonić do cioci bernadetty i zapytać czy będzie coś przyrządzać. Zadzwonić do cioci bernadetty i zapytać czy będzie coś przyrządzać. Zadzwonić do cioci bernadetty i zapytać czy będzie coś przyrządzać. Zadzwonić do cioci bernadetty i zapytać czy będzie coś przyrządzać. Zadzwonić do cioci bernadetty i zapytać czy będzie coś przyrządzać. Zadzwonić do cioci bernadetty i zapytać czy będzie coś przyrządzać. Zadzwonić do cioci bernadetty i zapytać czy będzie coś przyrządzać.",
        type: TASKTYPE.TODO,
        reveal: false
    },
    {
        id: 4,
        title: "Wakacje",
        description: "Zarezerwować bilety",
        type: TASKTYPE.DONE,
        reveal: false
    },
    {
        id: 5,
        title: "Urodziny mamy",
        description: " Zadzwonić do cioci bernadetty i zapytać czy będzie coś przyrządzać. Zadzwonić do cioci bernadetty i zapytać czy będzie coś przyrządzać. Zadzwonić do cioci bernadetty i zapytać czy będzie coś przyrządzać. Zadzwonić do cioci bernadetty i zapytać czy będzie coś przyrządzać. Zadzwonić do cioci bernadetty i zapytać czy będzie coś przyrządzać. Zadzwonić do cioci bernadetty i zapytać czy będzie coś przyrządzać. Zadzwonić do cioci bernadetty i zapytać czy będzie coś przyrządzać. Zadzwonić do cioci bernadetty i zapytać czy będzie coś przyrządzać.",
        type: TASKTYPE.BLOCKED,
        blockNote: "Siostra zajmie się wszystkim",
        reveal: false
    }
]

let INITIAL_LIST_ARRAY: ListInterface[] = [
    {
        id: 1,
        title: "DEFAULT",
        type: TASKTYPE.TODO,
        items: []
    },
    {
        id: 2,
        title: "TODO",
        type: TASKTYPE.TODO,
        items: []
    },
    {
        id: 3,
        title: "DONE",
        type: TASKTYPE.DONE,
        items: []
    },
    {
        id: 4,
        title: "BLOCKED",
        type: TASKTYPE.BLOCKED,
        items: []
    },

]

const Todos = () => {
    // const [items, setItems] = useState<ItemInterface[]>(INITIAL_ARRAY);
    // const [lists, setLists] = useState<ListInterface[]>(INITIAL_LIST_ARRAY);
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
    //
    // const addListHandler = (list: ListInterface) => {
    //     setLists((lists: ListInterface[]) => {
    //         return [...lists, list];
    //     })
    // }


    return (
        <div>
            <header className="todos__template">
                <h1>To Do List App</h1>
                <div className="todos__header">
                </div>
                <div>
                    <ItemListCommunication/>
                </div>
            </header>
        </div>
    )
}

export default Todos

// <ItemsList
// items={items}
// amountOfItems={items.length}
// onItemStatusClickUpdate={onItemStatusClickUpdate}
// onItemClickRevealUpdate={onItemClickRevealUpdate}
// onItemKeyPressRevealUpdate={onItemClickRevealUpdate}
// onItemBlockNoteUpdate={onItemBlockNoteUpdate}/>
// <ListsList lists={lists} onAddList={addListHandler}/>;