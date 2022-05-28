import React, {useState, useEffect} from "react";
import CardElement from "../CardElement/CardElement";

import style from './DashboarContent.module.css';

import {CurrencyService} from '../../../HttpServices/CurrencyService';
import {useArcelorMittal} from "../../../Context/ArcelorMittalContext";

function DashboardContent (props) {

    const [currencies, setCurrencies] = useState(null);

    const { userLogged } = useArcelorMittal();

    useEffect(() => {
      
        const fetchData = async () => {
         
            const currencies = await new CurrencyService().getCurrency("");
  
            setCurrencies(currencies);
        }
      
        if(userLogged)
            fetchData();

      }, [userLogged]);

    const buildPricesContent = () => {

        let element = <p>Please, log in for seeing the price</p>;
        let subTitle = null;

        if (userLogged !== null && currencies !== null && props.prices !== null) {

            subTitle =  <p className={style.priceParagraph}>Prices' unit EUR</p>;
            element = props.prices.map((price, index) => {
                return <CardElement onSelectElement={props.onSelectedPrice} key={index} name={price.name} value={price.value} />;
            });
        }

        return (
            <div>
                <h1 className={style.priceTitle}>Prices</h1>
                {subTitle}
                {element}
            </div>
        )
    }

    const buildExchangeRateContent = () => {

        let element = <p>Please, log in for seeing the currency and apply the rate</p>;

        if (userLogged !== null && currencies !== null) {
            
            element = currencies.map((currency, index) =>  {
                return <CardElement onSelectElement={props.onSelectedRate} key={index} name="" value={currency.name} />
            });
        }

        return(
            <div>
                <h1>Exchange Rate</h1>
                {element}
            </div>
        );
    }

    return (
        <section className={style.container}>
            <div className={`${style.leftHalf} ${style.half}`}>
                {buildPricesContent()}
            </div>
            <div className={`${style.rightHalf} ${style.half}`}>
                {buildExchangeRateContent()}
            </div>
        </section>
    )
}

export default DashboardContent;