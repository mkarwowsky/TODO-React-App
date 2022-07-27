import {useState, useEffect} from "react";
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles(({
    chart__chartRevealed: ({
        height: 'auto',
        maxWidth: '20rem',
        display: 'flex',
        wordBreak: 'break-all',
    }),
    chart__chart: ({
        height: 'auto',
        maxWidth: '20rem',
        display: 'flex',
        wordBreak: 'break-all',
    }),
}));

const Chart = (props: {
    itemId: number,
    tabIndex: number,
    revealStatus: boolean,
    description: string,
    onItemClickRevealUpdate: Function,
    onItemKeyPressRevealUpdate: Function
}) => {
    const classes = useStyles();
    const [isRevealed, setIsRevealed] = useState(props.revealStatus);
    const [description, setDescription] = useState(props.description);

    useEffect(() => {
        setDescription(props.description.substring(0, 10) + "...");
    });

    const onHandleClick = () => {
        setIsRevealed(!isRevealed);
        props.onItemClickRevealUpdate(props.itemId, isRevealed);
    }

    return (
        <div onFocus={onHandleClick} onClick={onHandleClick}>
            {isRevealed ?
                <div tabIndex={props.tabIndex} className={classes.chart__chartRevealed}>{props.description}</div> :
                <div tabIndex={props.tabIndex} className={classes.chart__chart}>{description}</div>}
        </div>
    )
}

export default Chart;