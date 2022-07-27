import ListsForm from "./ListsForm";
import { ListInterface } from "./List"
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(({
    newItem__template: ({
        width: '100%',
    }),
}));

const NewList = (props: { onAddList: Function }) => {
    const classes = useStyles();

    const saveListDataHandler = (enteredListData: ListInterface) => {
        const ItemData = {
            ...enteredListData,
            id: Math.random().toString()
        };
        props.onAddList(ItemData);
    };

    return (
        <div className={classes.newItem__template}>
            <ListsForm onSaveListData={saveListDataHandler}/>
        </div>
    )
}

export default NewList;