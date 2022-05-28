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

    const { userLogged, userLogin } = useArcelorMittal();
    
    const [isLoginModalClose, setIsLoginModalClose] = useState(true);
    const [prices, setprices] = useState(null);

    useEffect(() => {
      
      const fetchData = async () => {
       
        const prices = await new PricesServices().getPrices();

        setprices(prices);
      }
    
      fetchData();
       
    }, []);

    const openModal = () => {
        setIsLoginModalClose(false);
    }

    const closeModal = () => {
        setIsLoginModalClose(true);
    }

    const buildAppBody = () => {

      return  (
        <div>
          <div className={style.welcomeMessage}>
            <WelcomeMessage isUserLogged={userLogged} />
            </div>
          <div>
            <DashboardContent prices={prices} />
          </div>
        </div>
      );
    }   
    
    const buildLoginLogoutButton = () => {
      
      if (userLogged === null) 
        return  <Button onClick={openModal}>Login</Button>
      
      return (
        <div className={style.logout}>
          <p>{userLogged.username}</p>
          <Button onClick={openModal}>Logout</Button>
        </div>
      );
      
    }

    const userLoginHandler = async (user) => {
      await userLogin(user);
      closeModal();
    }

    return (
      <div className={style.app}>
        <header className={style.appHeader}>
            <div className={style.logoHeader}>
              <img src={logo} className={style.appLogo} alt="logo"/>
              <p className={style.title}>ArcelorMitall</p>
            </div>
            {buildLoginLogoutButton()}
        </header>
        <div className={style.body}>
          {buildAppBody()}
        </div>
        <footer className={style.footer}>Ernesto Petit - AcerlorMitall 2022.</footer>
        {!isLoginModalClose && <LoginModal title="Login" onCloseModal={closeModal} onUserLogin={userLoginHandler}/>}
      </div>
    );
}

export default Dashboard;