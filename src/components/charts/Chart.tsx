import {useState, useEffect, useRef} from "react";

import './Chart.css'

const Chart = (props: {
    itemId: number,
    tabIndex: number,
    revealStatus: boolean,
    description: string,
    onItemClickRevealUpdate: Function,
    onItemKeyPressRevealUpdate: Function
}) => {
    const [isRevealed, setIsRevealed] = useState(props.revealStatus);
    const [description, setDescription] = useState(props.description);

    useEffect(() => {
        setDescription(props.description.substring(0, 25) + "...");
    });

    const onHandleClick = () => {
        setIsRevealed(!isRevealed);
        props.onItemClickRevealUpdate(props.itemId, isRevealed);
    }

    const onItemKeyPressRevealUpdate = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Tab") {
            setIsRevealed(!isRevealed);
            props.onItemKeyPressRevealUpdate(props.itemId, isRevealed);
        }
    }

    return (
        <div onClick={onHandleClick}
             onKeyUp={onItemKeyPressRevealUpdate} > {
            isRevealed ? <div tabIndex={props.tabIndex} className="chart__chart-revealed">{props.description}</div> :
                <div tabIndex={props.tabIndex} className="chart__chart">{description}</div>}
        </div>
    )
}

export default Chart;