import { useState } from "react";
import { TASKTYPE } from "./TaskStatus";
import './Form.css'

export interface ItemInputData {
    enteredTitle: string,
    enteredDescription: string
}

const Form = (props: {onSaveItemData: Function}) => {
    const [enteredData, setEnteredData] = useState<ItemInputData>({enteredTitle: '', enteredDescription: ''});

    const titleChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
        setEnteredData({
            ...enteredData,
            enteredTitle: (event.currentTarget.value).toString()});
    };

    const descriptionChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
        setEnteredData({
            ...enteredData,
            enteredDescription: event.currentTarget.value});
    };

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const itemData = {
            title: enteredData.enteredTitle,
            description: enteredData.enteredDescription,
            type: TASKTYPE.TODO,
            reveal: false,
        }
        if(enteredData.enteredTitle.length > 1) {
            props.onSaveItemData(itemData);
            setEnteredData({
                enteredTitle: '',
                enteredDescription: ''
            });
        }
    }

    return (
        <form onSubmit={submitHandler} className="form__template">
            <div>
                <input className="input__control"
                       type="text"
                       placeholder="Title"
                       minLength={2}
                       maxLength={100}
                       value={enteredData.enteredTitle}
                       onChange={titleChangeHandler}
                />
            </div>
            <div>
                <input className="input__control"
                       type="text"
                       placeholder="Description"
                       minLength={0}
                       maxLength={1000}
                       value={enteredData.enteredDescription}
                       onChange={descriptionChangeHandler}
                />
            </div>
            <div>
                <button className="item-button-add" type="submit">Add</button>
            </div>
        </form>
    );
}

export default Form;