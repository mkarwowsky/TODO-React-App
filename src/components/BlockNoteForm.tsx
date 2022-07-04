import {useEffect, useState} from "react";
import { TASKTYPE } from "./TaskStatus";

import "./BlockNoteForm.css"
import "./Item.css"
import {AiOutlineEdit} from "react-icons/ai"

const BlockNoteForm = (props: { itemId: number, blockNote?: string, itemStatus: TASKTYPE, onSaveBlockNote: Function }) => {
    const [blockNote, setBlockNote] = useState<string>('');
    const [showBlockNote, setShowBlockNote] = useState(false);

    useEffect(() => {
        if(props.blockNote) {
            setBlockNote(props.blockNote);
            setShowBlockNote(true);
        } else setShowBlockNote (false);
    },[]);

    useEffect(() => {
        if(!props.itemStatus) {
            setShowBlockNote(true);
        }
    },[]);

    const blockNoteChanger = (event: React.FormEvent<HTMLInputElement>) => {
        setBlockNote(event.currentTarget.value);
    };

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onSaveBlockNote(props.itemId, blockNote);
        setBlockNote(blockNote);
        setShowBlockNote(!showBlockNote);
    }

    const clickHandler = () => {
        setShowBlockNote(!showBlockNote);
    }

    return (
        <div>
            <div>
                {showBlockNote && <div className="item__item-blocked-note">
                    {(props.itemStatus === TASKTYPE.BLOCKED) ? blockNote : 0}
                    <button className="item-button-add" onClick={clickHandler}>
                        <AiOutlineEdit/>
                    </button>
                </div>
                }
            </div>

            {!showBlockNote && <form className="form__input-blocked-note" onSubmit={submitHandler}>
                <div>
                    <input
                        className="form__input"
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