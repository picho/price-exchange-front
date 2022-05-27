import React from 'react';

import { useState, useEffect } from "react";

import WelcomeMessage from './WelcomeMessage/WelcomeMessage';
import DashboardContent from './DashboarContent/DashboarContent';
import Button from '../UI/Button';
import LoginModal from '../UI/LoginModal';

import {useArcelorMittal} from "../../Context/ArcelorMittalContext";

import { PricesServices } from '../../HttpServices/PricesServices';

import logo from  '../../Arcelormittal-logo.png';
import style from'./Dashboard.module.css';

function Dashboard() {

    const [isUserLogged, setIsUserLogged] = useState(false);
    const [isLoginModalClose, setIsLoginModalClose] = useState(true);
    const [prices, setprices] = useState(null);

    useEffect(() => {
      
      const fetchData = async () => {
       
        const prices = await new PricesServices().getPrices();

        setprices(prices);
      }
    
      fetchData();
       
    }, []);

    //const { user } = useArcelorMittal();

    const openModal = () => {
        setIsLoginModalClose(false);
    }

    const closeModal = () => {
        setIsLoginModalClose(true);
    }

    const buildAppBody = () => {

      return  (
        <div>
          {
            (!isUserLogged) 
            ? <div className={style.welcomeMessage}><WelcomeMessage /></div>
            : null
          }
          <div>
            <DashboardContent prices={prices} />
          </div>
        </div>
      );
     
    }

    

    const submitUser = () => {

    }


    return (
      <div className={style.app}>
        <header className={style.appHeader}>
            <div className={style.logoHeader}>
              <img src={logo} className={style.appLogo} alt="logo"/>
              <p className={style.title}>ArcelorMitall</p>
            </div>
            <Button onClick={openModal}>Login</Button>
        </header>
        <div className={style.body}>
          {buildAppBody()}
        </div>
        <footer className={style.footer}>Ernesto Petit - AcerlorMitall 2022.</footer>
        {!isLoginModalClose && <LoginModal title="Login" onCloseModal={closeModal}/>}
      </div>
    );
}

export default Dashboard;