import React from 'react';
import style from './Price.module.css'

function Price(props) {
    return(
        <div>
            <div>
                <span className={style.spanMargin}>Name</span>
                <span className={style.spanMargin}>{props.name}</span>
                <span className={style.spanMargin}>Value</span>
                <span className={style.spanMargin}>{props.value}</span>
            </div>
        </div>
    );
}

export default Price;