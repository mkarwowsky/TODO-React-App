import ListsForm from "./ListsForm";
import { ListInterface } from "./List"

const NewList = (props: { onAddList: Function }) => {
    const saveListDataHandler = (enteredListData: ListInterface) => {
        const ItemData = {
            ...enteredListData,
            id: Math.random().toString()
        };
        props.onAddList(ItemData);
    };

    return (
        <div className="new-item__template">
            <ListsForm onSaveListData={saveListDataHandler}/>
        </div>
    )
}

export default NewList;