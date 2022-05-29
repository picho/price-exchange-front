import React, {useState, useEffect} from 'react';
import Button from '../../UI/Button';

import style from './Operation.module.css';

import { ExchangeRateService } from '../../../HttpServices/ExchangeRateService';

function Operation(props) {

    const [exchangeRateResult, setResult] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [selectedRate, setSelectedRate] = useState(null);
    const [isLoadingActive, setIsLoadingActive] = useState(false);

    useEffect(() => {
        setSelectedPrice(props.selectedPrice);
        setSelectedRate(props.selectedRate)
      }, [props.selectedPrice,props.selectedRate]);

    
    const callApiExchange =  async () => {

        setIsLoadingActive(true);

        const queryParams = `${selectedPrice}&${selectedRate}`;

        const result = await new ExchangeRateService().getRateResult(queryParams);

        setResult({rate: result.info.rate, result: result.result});

        setIsLoadingActive(false);
    }

    const cleanValues = () => {
        setSelectedPrice(null);
        setSelectedRate(null);
    }

    const showButton = () =>  {
        
        if ((selectedPrice === null) || (selectedRate === null))
            return null 
        else
            return (
                <>
                    <Button onClick={callApiExchange}>Calculate</Button>
                    <Button onClick={() => cleanValues()}>Restart</Button>
                </>
            );
    }

    const showExchangeResult = () => {

        if(exchangeRateResult === null)
            return null;

        if(selectedPrice === null && selectedRate === null)
            return null;

        return (
            <div className={style.tableContainer}>
               <table>
                   <thead>
                    <tr>
                        <th>Currency From</th>
                        <th>Currency To</th>
                        <th>Value</th>
                        <th>Rate</th>
                        <th>Exchange Result</th>
                    </tr>
                   </thead>
                    <tbody>
                        <tr>
                            <td>EUR</td>
                            <td>{selectedRate}</td>
                            <td>{selectedPrice}</td>
                            <td>{exchangeRateResult.rate}</td>
                            <td>{exchangeRateResult.result}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    const showLoading = () => {
        return (isLoadingActive) ? <h2>Loading Rate...</h2> : null;
    }

    return (
        <div className={style.operationContent}>
            <h1>Operation Panel</h1>
            {((selectedPrice === null) || (selectedRate === null)) 
                ?  <p>Please, click one price and one rate to continue</p>
                : null
            }
            <div className={style.operationValues}>
                {(selectedPrice) ? <span>Value {selectedPrice}€</span> : null }
                {(selectedRate) ? <span>Currency {selectedRate}</span> : null }
            </div>
            {showButton()}
            <div>
                <div>{showLoading()}</div>
                <div>{showExchangeResult()}</div>
            </div>
        </div>
    );
}

export default Operation;