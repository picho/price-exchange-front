import React from 'react';
import style from './CardElement.module.css'

function CardElement(props) {

    const selectElement = () => {

        props.onSelectElement(props.value);
    }

    const buildCardName = () => {

        return (props.name)
        ? (
            <React.Fragment>
                <span className={style.spanMargin}>Name</span>
                <span className={style.spanMargin}>{props.name}</span>
            </React.Fragment>
        )
        : null;
    }

    return(
        <div className={style.card} onClick={() => selectElement()}>
            {buildCardName()}
            <span className={style.spanMargin}>Value</span>
            <span className={style.spanMargin}>{props.value}</span>
        </div>
    );
}

export default CardElement;