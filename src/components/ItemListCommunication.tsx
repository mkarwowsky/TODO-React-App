import React, {useEffect, useState} from "react";
import Item, {ItemInterface} from "./Item";
import ListsList from "./lists/ListsList";
import NewItem from "./NewItem";
import List, {ListInterface} from "./lists/List";
import {TASKTYPE} from "./TaskStatus";

import "./pages/Todos.css"
import './charts/Chart.css'
import './ItemsList.css'
import listsList from "./lists/ListsList";

const INITIAL_LIST_ARRAY: ListInterface[] = [
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
    const [filteredItems, setFilteredItems] = useState<ItemInterface[]>([]);
    const [lists, setLists] = useState<ListInterface[]>(INITIAL_LIST_ARRAY);
    let listsCopyArray: ListInterface[] = lists;
    let itemsCopyArray: ItemInterface[] = items;

    useEffect(() => {
        for (let i = 0; i < items.length; i++) {
            if (items[i].type === TASKTYPE.DELETED) {
                items.splice(i, 1);
                setItems(items);
            }
        }
    })

    useEffect(() => {
        for (let i = 0; i < lists.length; i++) {
            if (lists[i].type === TASKTYPE.DELETED) {
                lists.splice(i, 1);
                setLists(lists);
            }
        }
    })

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('items') || '[]');
        if (items) {
            setItems(items);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items));
    }, [items]);

    useEffect(() => {
        const lists = JSON.parse(localStorage.getItem('lists') || '[]');
        if (lists) {
            setLists(lists);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(lists));
    }, [lists]);

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
        })
        localStorage.setItem('items', JSON.stringify([...items, item]));
    }

    const addListHandler = (list: ListInterface) => {
        setLists((lists: ListInterface[]) => {
            return [...lists, list];
        })
        localStorage.setItem('lists', JSON.stringify([...lists, list]));
    }

    const chooseListHandler = (listItem: ListInterface, items: ItemInterface[]) => {
        listItem.type === TASKTYPE.ALL ? setFilteredItems(itemsCopyArray) : setFilteredItems(itemsCopyArray.filter(item => item.type === listItem.type));
    }

    const onItemDeleteUpdate = () => {}

    const onDeleteList = (listItem: ListInterface) => {
        console.log(listItem.id + " " + listItem.type + " " + listItem.title);
    }

    return (
        <div>
            <div className="todos__lists-header">
                <NewItem onAddItem={addItemHandler}/>
            </div>
            <div className="todos__items">
                <li className="items-list__template">
                    {filteredItems.map((item, index) => (
                        <ol key={item.id} id={item.id.toString()}>
                            <Item
                                tabIndex={0}
                                itemInterface={item}
                                onItemStatusClickUpdate={onItemStatusClickUpdate}
                                onItemClickRevealUpdate={onItemClickRevealUpdate}
                                onItemKeyPressRevealUpdate={onItemClickRevealUpdate}
                                onItemBlockNoteUpdate={onItemBlockNoteUpdate}
                                onItemDeleteUpdate={onItemDeleteUpdate}
                            />
                        </ol>
                    ))}
                </li>
                <ListsList
                    lists={lists}
                    buildInLists={INITIAL_LIST_ARRAY}
                    onAddList={addListHandler}
                    onChooseList={chooseListHandler}
                    onDeleteList={onDeleteList}
                    items={filteredItems}/>
            </div>
        </div>
    )
}

export default ItemListCommunication;