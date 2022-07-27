import React from "react";
import List, {ListInterface} from "./List"
import NewList from "./NewList"
import {ItemInterface} from "../Item";
import {makeStyles} from '@mui/styles';

import "./ListsList.css"

const useStyles = makeStyles(({
    listsList__template: ({
        borderRadius: '5px',
        justifyContent: 'center',
        minWidth: '20%',
        maxWidth: 'min-content',
        margin: '0.5rem 0.5rem',
        padding: '0 0 1rem 0',
        background: '#33ab9f',
        color: 'white',
    }),
}));

const ListsList = (props: {
    lists: ListInterface[],
    buildInLists: ListInterface[],
    onAddList: Function,
    onChooseList: Function,
    onDeleteListUpdate: Function,
    items: ItemInterface[],
    onEditListTitle: Function
}) => {
    const classes = useStyles();
    const buildInList: boolean = true;

    return (
        <div className={classes.listsList__template}>
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
                        lists={props.lists}
                        onEditListTitle={props.onEditListTitle}/>
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
                            lists={props.lists}
                            onEditListTitle={props.onEditListTitle}/>
                    ))}
                </ol>
            </div>
        </div>
    )
}

export default ListsList;