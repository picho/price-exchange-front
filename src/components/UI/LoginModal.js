import React from "react";
import ReactDOM  from "react-dom";

import Button from "./Button";
import Card from "./Card";

import style from './LoginModal.module.css';

const Backdrop = (props) => {
    return <div className={style.backdrop} onClick={props.onCloseModal} />
}

const ModalOverlay = (props) => {
    return (
        <Card className={style.modal}>
            <header className={style.header}>
                <h2>{props.title}</h2>
            </header>
            <div className={style.content}>
                <input placeholder="Username" />
            </div>
            <div className={style.content}>
                <input type="password" placeholder="Password" />
            </div>
            <footer className={style.actions}>
                <Button onClick={props.onCloseModal}>Submit</Button>
                <Button onClick={props.onCloseModal}>Cancel</Button>
            </footer>
        </Card>
    );
}

const LoginModal = (props) => {

    return(
        <>
            {ReactDOM.createPortal(<Backdrop onCloseModal={props.onCloseModal}/>, document.getElementById("backdrop-root"))}
            {ReactDOM.createPortal(<ModalOverlay title={props.title} message={props.message} onCloseModal={props.onCloseModal}/>, document.getElementById("overlay-root"))}
        </>
    )

}

export default LoginModal;