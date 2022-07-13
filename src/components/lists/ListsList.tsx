import React, {useEffect} from "react";
import List, {ListInterface} from "./List"
import NewList from "./NewList"
import {ItemInterface} from "../Item";


import "./ListsList.css"
import '../Form.css'

const ListsList = (props: {
    lists: ListInterface[],
    buildInLists: ListInterface[],
    onAddList: Function,
    onChooseList: Function,
    onDeleteListUpdate: Function,
    items: ItemInterface[]
}) => {
    const buildInList: boolean = true;

    return (
        <div className="lists-list__template">
            <NewList onAddList={props.onAddList}/>
            <div>
                {props.buildInLists.map((list) => (
                        <List
                            key={list.id}
                            listInterface={list}
                            onChooseList={props.onChooseList}
                            onDeleteListUpdate={props.onDeleteListUpdate}
                            buildInList={buildInList}
                            items={props.items}
                            lists={props.lists}/>
                ))}
                <br></br>
                <ol>
                    {props.lists.map((list) => (
                        <List
                            key={list.id}
                            listInterface={list}
                            onChooseList={props.onChooseList}
                            onDeleteListUpdate={props.onDeleteListUpdate}
                            buildInList={!buildInList}
                            items={props.items}
                            lists={props.lists}/>
                    ))}
                </ol>
            </div>
        </div>
    )
}

export default ListsList;