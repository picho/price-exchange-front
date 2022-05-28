import React from "react";
import Price from "../Price/Price";

import style from './DashboarContent.module.css';

function DashboardContent (props) {


    const buildPricesContent = () => {

        if(props.prices === null)
          return null;
  
        return props.prices.map((price, index) => {
            console.log(price);
            return <Price key={index} name={price.name} value={price.value} />;
        })
  
      }

    return (
        <section className={style.container}>
            <div className={`${style.leftHalf} ${style.half}`}>
                <div>
                    {buildPricesContent()}
                </div>
            </div>
            <div className={`${style.rightHalf} ${style.half}`}>
                <article>
                <h1>Right Half</h1>
                <p>If your knees aren't green by the end of the day, you ought to seriously re-examine your life.</p>
                </article>
            </div>
        </section>
        // <div>
        //     <div></div>
        //     <div>como</div>
        // </div>
    )

}

export default DashboardContent;