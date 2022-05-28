import React, {useState, useEffect} from "react";
import Price from "../Price/Price";

import style from './DashboarContent.module.css';

import {ExchangeRateService} from '../../../HttpServices/ExchangeRateService';
import {useArcelorMittal} from "../../../Context/ArcelorMittalContext";

function DashboardContent (props) {

    const [currencies, setCurrencies] = useState(null);

    const { userLogged } = useArcelorMittal();

    useEffect(() => {
      
        const fetchData = async () => {
         
            const currencies = await new ExchangeRateService().getCurrency();
  
            setCurrencies(currencies);
        }
      
        if(props.userLogged)
            fetchData();

      }, [userLogged]);

    const buildPricesContent = () => {

        if(props.prices === null)
          return null;
  
        return props.prices.map((price, index) => {
            return <Price key={index} name={price.name} value={price.value} />;
        })
    }

    const buildExchangeRateContent = () => {

        let element = <p>Please, log in for seeing the currency and apply the rate</p>;

        if (userLogged !== null && currencies !== null)
            element = currencies.map((currency, index) =>  <div key={index}>{currency.name}</div> );

        return(
            <div>
                <h2>Exchange Rate</h2>
                {element}
            </div>
        );
    }

    return (
        <section className={style.container}>
            <div className={`${style.leftHalf} ${style.half}`}>
                <div>
                    {buildPricesContent()}
                </div>
            </div>
            <div className={`${style.rightHalf} ${style.half}`}>
                {buildExchangeRateContent()}
            </div>
        </section>
    )
}

export default DashboardContent;