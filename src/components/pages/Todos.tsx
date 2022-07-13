import React from "react";
import ItemListCommunication from "../ItemListCommunication";

import "./Todos.css";


const Todos = () => {
    return (
        <div>
            <header className="todos__template">
                <h1>To Do List App</h1>
                <div>
                    <ItemListCommunication/>
                </div>
            </header>
        </div>
    )
}

export default Todos