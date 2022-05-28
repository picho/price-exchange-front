import React from 'react';
import style from './CardElement.module.css'

function CardElement(props) {

    const selectElement = () => {

        props.onSelectElement(props.value);
    }

    const buildCardName = () => {

        return (props.name)
        ? (<><span className={style.spanMargin}>{props.name}</span></>)
        : null;
    }

    const value = (props.valueUnit !== undefined)  ? props.value + props.valueUnit : props.value;

    return(
        <div className={style.card} onClick={() => selectElement()}>
            {buildCardName()}
            <span className={style.spanMargin}>{value}</span>
        </div>
    );
}

export default CardElement;