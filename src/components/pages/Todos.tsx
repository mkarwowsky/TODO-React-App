import React from "react";
import ItemListCommunication from "../ItemListCommunication";

import {RiCalendarTodoLine} from "react-icons/ri"
import "./Todos.css";


const Todos = () => {
    return (
        <div>
            <header className="todos__template">
                <h1 className="todos__h1"><RiCalendarTodoLine/>|To Do List App</h1>
                <div>
                    <ItemListCommunication/>
                </div>
            </header>
        </div>
    )
}

export default Todos