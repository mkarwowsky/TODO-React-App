import {useState} from "react";
import {TASKTYPE} from "./TaskStatus";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles(({
    form__template: ({
        background: '#0276aa',
        border: '1px solid #0276aa',
        textAlign: 'center',
        padding: '0.5rem',
        margin: '0.5rem',
        width: 'auto',
    }),

    input__control: ({
        margin: '0 0 0.5rem 0',
        alignSelf: 'center',
        fontFamily: '"Roboto", sans-serif',
        color: '#333',
        fontSize: '0.8rem',
        padding: '0.25rem 0.5rem',
        borderRadius: '0.2rem',
        backgroundColor: 'rgb(255, 255, 255)',
        border: 'none',
        borderBottom: '0.3rem solid transparent',
        transition: 'all 0.3s',
        width: '20vw',
        display: 'inline-flex',
    })

}));

export interface ItemInputData {
    enteredTitle: string,
    enteredDescription: string
}

const Form = (props: { onSaveItemData: Function }) => {
    const classes = useStyles();
    const [enteredData, setEnteredData] = useState<ItemInputData>({enteredTitle: '', enteredDescription: ''});

    const titleChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
        setEnteredData({
            ...enteredData,
            enteredTitle: (event.currentTarget.value).toString()
        });
    };

    const descriptionChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
        setEnteredData({
            ...enteredData,
            enteredDescription: event.currentTarget.value
        });
    };

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const itemData = {
            title: enteredData.enteredTitle,
            description: enteredData.enteredDescription,
            type: TASKTYPE.TODO,
            reveal: false,
        }
        if (enteredData.enteredTitle.length > 1) {
            props.onSaveItemData(itemData);
            setEnteredData({
                enteredTitle: '',
                enteredDescription: ''
            });
        }
    }

    return (
        <form onSubmit={submitHandler} className={classes.form__template}>
            <div>
                <input className={classes.input__control}
                       type="text"
                       placeholder="Title"
                       minLength={2}
                       maxLength={100}
                       value={enteredData.enteredTitle}
                       onChange={titleChangeHandler}
                />
            </div>
            <div>
                <input className={classes.input__control}
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