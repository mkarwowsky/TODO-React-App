import React from "react";
import List, {ListInterface} from "./List"
import NewList from "./NewList"

import "./ListsList.css"
import '../Form.css'
import {ItemInterface} from "../Item";

const ListsList = (props: {
    lists: ListInterface[],
    buildInLists: ListInterface[],
    onAddList: Function,
    onChooseList: Function,
    onDeleteList: Function,
    items: ItemInterface[]
}) => {

    const buildInList: boolean = true;

    return (
        <div className="lists-list__template">
            <NewList onAddList={props.onAddList}/>
            <li>
                {props.buildInLists.map((list, index) => (
                    <ol key={index} id={list.id.toString()}>
                        <List
                            listId={list.id}
                            listTitle={list.title}
                            listType={list.type}
                            listItems={list.items}
                            listInterface={list}
                            onChooseList={props.onChooseList}
                            onDeleteList={props.onDeleteList}
                            buildInList={buildInList}
                            items={props.items}/>
                    </ol>
                ))}
                <br></br>
                {props.lists.map((list, index) => (
                    <ol key={index} id={list.id.toString()}>
                        <List
                            listId={list.id}
                            listTitle={list.title}
                            listType={list.type}
                            listItems={list.items}
                            listInterface={list}
                            onChooseList={props.onChooseList}
                            onDeleteList={props.onDeleteList}
                            buildInList={!buildInList}
                            items={props.items}/>
                    </ol>
                ))}
            </li>
        </div>
    )
}

export default ListsList;