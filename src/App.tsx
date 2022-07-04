import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import {ItemInterface} from './components/Item';
import ItemsList from "./components/ItemsList";
import NewItem from "./components/NewItem";

import './App.css';
import Router from "./components/pages/Router";
import Todos from "./components/pages/Todos";

const App = () => {
    return (
        <Router/>
    );
}

export default App;
