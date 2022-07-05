import React, {useEffect, useState} from "react";
import Item, {ItemInterface} from "./Item";
import {ListInterface} from "./lists/List";
import {TASKTYPE} from "./TaskStatus";
import ItemsList from "./ItemsList";
import ListsList from "./lists/ListsList";
import NewItem from "./NewItem";

import "./pages/Todos.css"


const INITIAL_ARRAY: ItemInterface[] = [
    // {
    //     id: 1,
    //     title: "Zakupy",
    //     description: "Mąka, por, ziemniaki, cebula, rabarbar",
    //     type: TASKTYPE.TODO,
    //     reveal: false
    // }
    // {
    //     id: 2,
    //     title: "Piątek",
    //     description: "Lekarz i umówić dentystę.",
    //     type: TASKTYPE.BLOCKED,
    //     blockNote: "Lekarz odezwie się.",
    //     reveal: false
    // },
    // {
    //     id: 3,
    //     title: "Urodziny mamy",
    //     description: " Zadzwonić do cioci bernadetty i zapytać czy będzie coś przyrządzać. Zadzwonić do cioci bernadetty i zapytać czy będzie coś przyrządzać. Zadzwonić do cioci bernadetty i zapytać czy będzie coś przyrządzać. Zadzwonić do cioci bernadetty i zapytać czy będzie coś przyrządzać. Zadzwonić do cioci bernadetty i zapytać czy będzie coś przyrządzać. Zadzwonić do cioci bernadetty i zapytać czy będzie coś przyrządzać. Zadzwonić do cioci bernadetty i zapytać czy będzie coś przyrządzać. Zadzwonić do cioci bernadetty i zapytać czy będzie coś przyrządzać.",
    //     type: TASKTYPE.TODO,
    //     reveal: false
    // },
    // {
    //     id: 4,
    //     title: "Wakacje",
    //     description: "Zarezerwować bilety",
    //     type: TASKTYPE.DONE,
    //     reveal: false
    // },
    // {
    //     id: 5,
    //     title: "Urodziny mamy",
    //     description: " Zadzwonić do cioci bernadetty i zapytać czy będzie coś przyrządzać. Zadzwonić do cioci bernadetty i zapytać czy będzie coś przyrządzać. Zadzwonić do cioci bernadetty i zapytać czy będzie coś przyrządzać. Zadzwonić do cioci bernadetty i zapytać czy będzie coś przyrządzać. Zadzwonić do cioci bernadetty i zapytać czy będzie coś przyrządzać. Zadzwonić do cioci bernadetty i zapytać czy będzie coś przyrządzać. Zadzwonić do cioci bernadetty i zapytać czy będzie coś przyrządzać. Zadzwonić do cioci bernadetty i zapytać czy będzie coś przyrządzać.",
    //     type: TASKTYPE.BLOCKED,
    //     blockNote: "Siostra zajmie się wszystkim",
    //     reveal: false
    // }
]

let INITIAL_LIST_ARRAY: ListInterface[] = [
    {
        id: 1,
        title: "ALL",
        type: TASKTYPE.ALL,
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

const ItemListCommunication = () => {
    const [items, setItems] = useState<ItemInterface[]>([]);
    const [itemsToFilter, setItemsToFilter] = useState<ItemInterface[]>([]);
    const [lists, setLists] = useState<ListInterface[]>(INITIAL_LIST_ARRAY);
    let itemsCopyArray: ItemInterface[] = items;

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('items') || '{}');
        if (items) {
            setItems(items);
        }
    },[]);

    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items));
    }, [items]);

    const onItemStatusClickUpdate = (itemId: number, status: TASKTYPE) => {
        const findItem = items.findIndex(itemTooDo => itemTooDo.id === itemId);
        items[findItem].type = status;
        setItems(items);
        localStorage.setItem('items', JSON.stringify(items));
    }

    const onItemClickRevealUpdate = (itemId: number) => {
        const findItem = items.findIndex(itemTooDo => itemTooDo.id === itemId);
        items[findItem].reveal = !items[findItem].reveal;
        setItems(items);
        localStorage.setItem('items', JSON.stringify(items));
    }

    const onItemBlockNoteUpdate = (itemId: number, blockNote: string) => {
        const findItem = items.findIndex(itemTooDo => itemTooDo.id === itemId);
        items[findItem].blockNote = blockNote;
        setItems(items);
        localStorage.setItem('items', JSON.stringify(items));
    }

    const addItemHandler = (item: ItemInterface) => {
        setItems((items) => {
            return [...items, item];
            localStorage.setItem('items', JSON.stringify([...items, item]));
        })
    }

    const addListHandler = (list: ListInterface) => {
        setLists((lists: ListInterface[]) => {
            return [...lists, list];
            localStorage.setItem('lists', JSON.stringify([...lists, list]));
        })
    }

    const chooseListHandler = (listItem: ListInterface, items: ItemInterface[]) => {
        // console.log(itemsCopyArray.filter(item => item.type === listItem.type));
        setItemsToFilter(itemsCopyArray.filter(item => item.type === listItem.type));
    }

    console.log(itemsToFilter);
    return (
        <div>
            <div className="todos__lists-header">
                <NewItem onAddItem={addItemHandler}/>
            </div>
            <div className="todos__items">
                <ItemsList
                    items={items}
                    amountOfItems={items.length}
                    onItemStatusClickUpdate={onItemStatusClickUpdate}
                    onItemClickRevealUpdate={onItemClickRevealUpdate}
                    onItemKeyPressRevealUpdate={onItemClickRevealUpdate}
                    onItemBlockNoteUpdate={onItemBlockNoteUpdate}/>
                <ListsList
                    lists={lists}
                    onAddList={addListHandler}
                    onChooseList={chooseListHandler}
                    items={itemsToFilter}/>
            </div>
        </div>
    )
}

export default ItemListCommunication;