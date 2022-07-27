import {useEffect, useState} from "react";
import {TASKTYPE} from "./TaskStatus";
import {AiOutlineEdit} from "react-icons/ai"
import {makeStyles} from '@mui/styles';

import "./Item.css"

const useStyles = makeStyles(({
    form__inputBlockedNote: ({
        fontSize: '0.8rem',
        padding: '0.5rem',
        background: 'darkgray',
        borderBottom: '1px dashed #282c34',
    }),
    item__itemBlockedNote: ({
        fontSize: '0.8rem',
        padding: '0.5rem',
        background: 'darkgray',
        borderBottom: '1px dashed #282c34',
        display: 'flex',
        justifyContent: 'space-between',
    }),
    form__input: ({
        fontFamily: '"Roboto", sans-serif',
        color: '#333',
        fontSize: '0.8rem',
        margin: '0 auto',
        padding: '0.25rem 0.5rem',
        borderRadius: '0.2rem',
        backgroundColor: 'rgb(255, 255, 255)',
        border: 'none',
        width: 'auto',
        display: 'block',
        borderBottom: '0.3rem solid transparent',
        transition: 'all 0.3s',
        '&placeholder-shown': {
            opacity: '0',
            visibility: 'hidden',
            webkitTransform: 'translateY(-4rem)',
            transform: 'translateY(-4rem)',
        }
    })
}));

const BlockNoteForm = (props: { itemId: number, blockNote?: string, itemStatus: TASKTYPE, onSaveBlockNote: Function }) => {
    const classes = useStyles();
    const [blockNote, setBlockNote] = useState<string>('');
    const [showBlockNote, setShowBlockNote] = useState(false);

    useEffect(() => {
        if (props.blockNote) {
            setBlockNote(props.blockNote);
            setShowBlockNote(true);
        } else setShowBlockNote(false);
    }, []);

    useEffect(() => {
        if (!props.itemStatus) {
            setShowBlockNote(true);
        }
    }, []);

    const blockNoteChanger = (event: React.FormEvent<HTMLInputElement>) => setBlockNote(event.currentTarget.value);

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onSaveBlockNote(props.itemId, blockNote);
        setBlockNote(blockNote);
        setShowBlockNote(!showBlockNote);
    }

    const clickHandler = () => setShowBlockNote(!showBlockNote);

    return (
        <div>
            <div>
                {showBlockNote && <div className={classes.item__itemBlockedNote}>
                    {(props.itemStatus === TASKTYPE.BLOCKED) ? blockNote : 0}
                    <button className="item-button-add" onClick={clickHandler}>
                        <AiOutlineEdit/>
                    </button>
                </div>
                }
            </div>

            {!showBlockNote && <form className={classes.form__inputBlockedNote} onSubmit={submitHandler}>
                <div>
                    <input
                        className={classes.form__input}
                        type="text"
                        placeholder="Title"
                        minLength={1}
                        maxLength={100}
                        value={blockNote}
                        onChange={blockNoteChanger}
                    />
                </div>
            </form>
            }
        </div>
    )
}

export default BlockNoteForm;