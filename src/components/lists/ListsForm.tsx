import {useState} from "react";
import {TASKTYPE} from "../TaskStatus";

import '../Form.css'

const ListsForm = (props: { onSaveListData: Function }) => {
    const [enteredListTitle, setEnteredListTitle] = useState<string>('');
    const [addList, setAddList] = useState<boolean>(true);
    const titleChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
        setEnteredListTitle(event.currentTarget.value);
    };

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const listData = {
            title: enteredListTitle,
            type: TASKTYPE.TODO,
            items: []
        }
        if (enteredListTitle.length >= 2){
            props.onSaveListData(listData);
            setEnteredListTitle('');
        }
    }

    return (
        <div>
            <div className="lists-list__header">
                <button onClick={() => setAddList(!addList)} className="item-button-add" type="submit">Add</button>
            </div>
            {!addList && <div className="form__input-add-item">
                <form onSubmit={submitHandler}>
                    <div>
                        <input className="form__input"
                               type="text"
                               placeholder="Title"
                               minLength={2}
                               maxLength={25}
                               value={enteredListTitle}
                               onChange={titleChangeHandler}
                        />
                    </div>
                </form>
            </div>
            }
        </div>
    );
}

export default ListsForm;