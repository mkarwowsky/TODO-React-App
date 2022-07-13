import {Routes, Route} from "react-router-dom";
import Todos from "./Todos";
import React from "react";

const Router = () => {
    return (
        <div>
            <Routes>
                <Route path="/*" element={<Todos/>}/>
            </Routes>
        </div>
    )
}

export default Router;