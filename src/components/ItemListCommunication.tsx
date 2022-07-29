import React, {useEffect, useState} from "react";
import Item, {ItemInterface} from "./Item";
import ListsList from "./lists/ListsList";
import NewItem from "./NewItem";
import {ListInterface} from "./lists/List";
import {TASKTYPE} from "./TaskStatus";

import "./pages/Todos.css"
import './ItemsList.css'

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
    const initialSelectedList = JSON.parse(localStorage.getItem('selectedList') || '1');
    const initialLists = JSON.parse(localStorage.getItem('lists') || '[]');
    const [items, setItems] = useState<ItemInterface[]>([]);
    const [filteredItems, setFilteredItems] = useState<ItemInterface[]>([]);
    const [lists, setLists] = useState<ListInterface[]>(initialLists);
    const [selectedList, setSelectedList] = useState<number>(initialSelectedList);
    let listsInitialArray: ListInterface[] = INITIAL_LIST_ARRAY;
    let itemsCopyArray: ItemInterface[] = items;
    let listsCopyArray: ListInterface[] = lists;



    useEffect(() => {
        localStorage.setItem('inistial-lists', JSON.stringify(listsInitialArray));
    }, []);

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
    }, [lists])

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

    useEffect(() => {
        if (selectedList) {
            setSelectedList(selectedList);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('selectedList', JSON.stringify(selectedList));

        if (selectedList === 1)
            setFilteredItems(items);
        else if (selectedList === 2)
            setFilteredItems(items.filter(item => item.type === TASKTYPE.TODO))
        else if (selectedList === 3)
            setFilteredItems(items.filter(item => item.type === TASKTYPE.DONE))
        else if (selectedList === 4)
            setFilteredItems(items.filter(item => item.type === TASKTYPE.BLOCKED))
        else {
            setFilteredItems((lists.filter(item => item.id === selectedList).map(item => item.items))[0]);
        }
    }, [selectedList, items]);


    const onItemStatusClickUpdate = (itemId: number, status: TASKTYPE) => {
        const findItem = items.findIndex(itemTooDo => itemTooDo.id === itemId);
        items[findItem].type = status;
        setItems(items);
        localStorage.setItem('items', JSON.stringify(items));

        lists.forEach(list => {
            list.items.forEach(item => {
                if (item.id === itemId) item.type = status;
                setLists(lists);
                localStorage.setItem('lists', JSON.stringify(lists))
            })
        })
    }

    const onItemClickRevealUpdate = (itemId: number) => {
        lists.forEach(list => {
            list.items.forEach(item => {
                if (item.id === itemId) item.reveal = !item.reveal;
                setLists(lists);
                localStorage.setItem('lists', JSON.stringify(lists))
            })
        })

        const findItem = items.findIndex(itemTooDo => itemTooDo.id === itemId);
        items[findItem].reveal = !items[findItem].reveal;
        setItems(items);
        localStorage.setItem('items', JSON.stringify(items));
    }

    const onItemBlockNoteUpdate = (itemId: number, blockNote: string) => {
        lists.forEach(list => {
            list.items.forEach(item => {
                if (item.id === itemId) item.blockNote = blockNote;
                setLists(lists);
                localStorage.setItem('lists', JSON.stringify(lists))
            })
        })

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

        if (selectedList !== 1) {
            const findItem = lists.findIndex(list => list.id === selectedList);
            lists[findItem].items.push(item);
            setLists(lists);
            localStorage.setItem('lists', JSON.stringify(lists));
        }
    }

    const addListHandler = (list: ListInterface) => {
        setLists((lists: ListInterface[]) => {
            return [...lists, list];
        })
        localStorage.setItem('lists', JSON.stringify([...lists, list]));
    }

    const chooseListHandler = (listItem: ListInterface) => {
        if (listItem.type === TASKTYPE.ALL)
            setFilteredItems(itemsCopyArray)
        else if (listItem.type !== TASKTYPE.NORMAL)
            setFilteredItems(itemsCopyArray.filter(item => item.type === listItem.type))
        else {
            listsCopyArray.filter(item => item.id === listItem.id).map(item => item.items);
            setFilteredItems((listsCopyArray.filter(item => item.id === listItem.id).map(item => item.items))[0]);
        }

        setSelectedList(listItem.id);
    }

    const onItemDeleteUpdate = (itemId: number) => {
        let findItem = items.findIndex(itemTooDo => itemTooDo.id === itemId);
        items[findItem].type = TASKTYPE.DELETED;
        setItems(items);

        lists.forEach(list => {
            list.items.forEach((item, index) => {
                if (item.id === itemId) {
                    list.items.splice(index, 1);
                    setLists(lists);
                    localStorage.setItem('lists', JSON.stringify(lists))
                }
            })
        })
    }

    const onDeleteListUpdate = (listId: number, listType: TASKTYPE, lists: ListInterface[]) => {
        let findItem = lists.findIndex(list => list.id === listId);
        let listItems = lists[findItem].items;

        listItems.forEach((listItem) => {
            let findItem = itemsCopyArray.findIndex(item => item.id === listItem.id);
            itemsCopyArray.splice(findItem, 1);
            setItems(itemsCopyArray);
            localStorage.setItem('items', JSON.stringify(itemsCopyArray));
        })

        lists[findItem].type = TASKTYPE.DELETED;
        listItems.length = 0;

        if (listType === TASKTYPE.DELETED) setLists(lists.filter(list => list.type !== listType));

        setSelectedList(1);
        setFilteredItems(itemsCopyArray);
    }

    const onEditListTitle = (listId: number, listTitle: string, lists: ListInterface[]) => {
        let findItem = lists.findIndex(list => list.id === listId);
        lists[findItem].title = listTitle;
        setLists(lists);
        localStorage.setItem('lists', JSON.stringify(lists));
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
                    buildInLists={listsInitialArray}
                    onAddList={addListHandler}
                    onChooseList={chooseListHandler}
                    onDeleteListUpdate={onDeleteListUpdate}
                    items={filteredItems}
                    onEditListTitle={onEditListTitle}/>
            </div>
        </div>
    )
}

export default ItemListCommunication;