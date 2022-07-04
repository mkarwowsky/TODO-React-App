import React from "react";
import List, {ListInterface} from "./List"
import NewList from "./NewList"

import "./ListsList.css"
import '../Form.css'
import {ItemInterface} from "../Item";

const ListsList = (props: { lists: ListInterface[], onAddList: Function, onChooseList: Function, items: ItemInterface[] }) => {

    return (
        <div className="lists-list__template">
                <NewList onAddList={props.onAddList}/>
            <li>
                {props.lists.map((list, index) => (
                    <ol key={index} id={list.id.toString()}>
                        <List
                            listId={list.id}
                            listTitle={list.title}
                            listType={list.type}
                            listItems={list.items}
                            listInterface={list}
                            onChooseList={props.onChooseList}
                            items={props.items}/>
                    </ol>
                ))}
            </li>
        </div>
    )
}

export default ListsList;