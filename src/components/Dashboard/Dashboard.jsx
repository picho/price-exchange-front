import React from 'react';

import { useState } from "react";

import WelcomeMessage from './WelcomeMessage/WelcomeMessage';
import DashboardContent from './DashboarContent/DashboarContent';
import Button from '../UI/Button';
import LoginModal from '../UI/LoginModal';
import Operation from './Operation/Operation';

import {useArcelorMittal} from "../../Context/ArcelorMittalContext";

import logo from  '../../Arcelormittal-logo.png';
import style from'./Dashboard.module.css';

function Dashboard() {

    const { userLogged, userLogin , userLogout} = useArcelorMittal();
    
    const [isLoginModalClose, setIsLoginModalClose] = useState(true);
    
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [selectedRate, setSelectedRate] = useState(null);

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
            <DashboardContent onSelectedPrice={onSelectedPrice} onSelectedRate={onSelectedRate}/>
          </div>
        </div>
      );
    }   

    const onSelectedPrice = (price) => {
      setSelectedPrice(price);
    }

    const onSelectedRate = (rate) => {
      setSelectedRate(rate);
    }
    
    const buildLoginLogoutButton = () => {
      
      if (userLogged === null) 
        return  <Button onClick={openModal}>Login</Button>
      
      return (
        <div className={style.logout}>
          <p className={style.username}>{userLogged.username}</p>
          <Button onClick={() => userLogout()}>Logout</Button>
        </div>
      );
    }

    const userLoginHandler = async (user) => {
      
      const userLogged = await userLogin(user);
      
      if(userLogged !== null)
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
          {(userLogged) ? <Operation selectedPrice={selectedPrice} selectedRate={selectedRate} /> : null} 
        </div>
        <footer className={style.footer}>Ernesto Petit - AcerlorMitall 2022.</footer>
        {!isLoginModalClose && <LoginModal title="Login" onCloseModal={closeModal} onUserLogin={userLoginHandler}/>}
      </div>
    );
}

export default Dashboard;