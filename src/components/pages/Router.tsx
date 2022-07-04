import {BrowserRouter, Routes, Route} from "react-router-dom";
import Todos from "./Todos";
import TodoList from "./TodoList";
import React from "react";

const Router = () => {
    return (
        <div>
            <Routes>
                <Route path="/*" element={<Todos/>}/>
                {/*<Route path="/*" element={<TodoList/>}/>*/}
            </Routes>
        </div>
    )
}

export default Router;