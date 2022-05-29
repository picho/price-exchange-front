import React, { useState, useEffect } from "react";
import ReactDOM  from "react-dom";

import Button from "./Button";
import Card from "./Card";

import style from './LoginModal.module.css';

import {useArcelorMittal} from "../../Context/ArcelorMittalContext";

const Backdrop = (props) => {
    return <div className={style.backdrop} onClick={props.onCloseModal} />
}

const ModalOverlay = (props) => {

    const { isUserAuth } = useArcelorMittal();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onUserSubmit = () => {

        const user = {
            username: username,
            password: password
        }

        props.onUserLogin(user);
    }

    const showErrorMessage = () => {
        return (isUserAuth === false) ? <p className={style.authError}>Authentication failded, please try it again</p> : null
    }

    return (
        <Card className={style.modal}>
            <header className={style.header}>
                <h2>{props.title}</h2>
            </header>
            <div className={style.content}>
                <input value={username} onChange={e => setUsername(e.target.value)}  placeholder="Username"/>
            </div>
            <div className={style.content}>
            <input value={password} onChange={e => setPassword(e.target.value)}  placeholder="Username" type="password"/>
            </div>
            <div>
                {showErrorMessage()}
            </div>
            <footer className={style.actions}>
                <Button onClick={() => onUserSubmit()}>Submit</Button>
                <Button onClick={props.onCloseModal}>Cancel</Button>
            </footer>
        </Card>
    );
}

const LoginModal = (props) => {

    return(
        <>
            {ReactDOM.createPortal(<Backdrop onCloseModal={props.onCloseModal}/>, document.getElementById("backdrop-root"))}
            {ReactDOM.createPortal(<ModalOverlay title={props.title} message={props.message} onCloseModal={props.onCloseModal} onUserLogin={props.onUserLogin}/>, document.getElementById("overlay-root"))}
        </>
    )

}

export default LoginModal;