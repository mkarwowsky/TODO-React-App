import {TASKTYPE} from "./TaskStatus";
import "./Item.css"
import BlockNoteForm from "./BlockNoteForm";


const BlockNote = (props: { itemId: number, blockNote?: string, itemStatus: TASKTYPE, onItemBlockNoteUpdate: Function }) => {


    return (
        <div>
            {props.itemStatus === TASKTYPE.BLOCKED && (
                <div>
                    <BlockNoteForm itemId={props.itemId}
                                   blockNote={props.blockNote}
                                   itemStatus={props.itemStatus}
                                   onSaveBlockNote={props.onItemBlockNoteUpdate}/>
                </div>
            )}
        </div>
    )
}

export default BlockNote;