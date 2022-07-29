import {createSlice} from "@reduxjs/toolkit"
import {ListInterface} from "../components/lists/List";
import {TASKTYPE} from "../components/TaskStatus";

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

export const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        arrayOfItems: [...INITIAL_LIST_ARRAY]
    },
    reducers: { //reducers are the actions you have to define to modify your state: add items, delete them,l change their name etc
        addItem(state, action) {
            state.arrayOfItems.push(action.payload)
        }
    }
})
