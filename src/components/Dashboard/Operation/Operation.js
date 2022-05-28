import React, {useState} from 'react';
import Button from '../../UI/Button';

import style from './Operation.module.css';

import { ExchangeRateService } from '../../../HttpServices/ExchangeRateService';

function Operation(props) {

    const [exchangeRateResult, setResult] = useState(null);

    const callApiExchange =  async () => {

        const queryParams = `${props.selectedPrice}&${props.selectedRate}`;

        const result = await new ExchangeRateService().getRateResult(queryParams);

        setResult({rate: result.info.rate, result: result.result});
    }

    const showButton = () =>  {
        
        if ((props.selectedPrice === null) || (props.selectedRate === null))
            return null 
        else
            return <Button onClick={callApiExchange}>Calculate</Button>
    }

    const showExchangeResult = () => {

        if(exchangeRateResult === null)
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
                            <td>{props.selectedRate}</td>
                            <td>{props.selectedPrice}</td>
                            <td>{exchangeRateResult.rate}</td>
                            <td>{exchangeRateResult.result}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <div className={style.operationContent}>
            <h1>Operation Panel</h1>
            <div className={style.operationValues}>
                {(props.selectedPrice) ? <span>Value {props.selectedPrice}€</span> : null }
                {(props.selectedRate) ? <span>Currency {props.selectedRate}</span> : null }
            </div>
            {showButton()}
            <div>
                <div>{showExchangeResult()}</div>
            </div>
        </div>
    );
}

export default Operation;