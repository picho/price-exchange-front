import React from 'react';
import ReactDOM from 'react-dom';

const Backdrop = (props) => {
    return <div className='algo' onClick={props.onConfirm}></div>
}


function LoginModal () {

    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop />, document.getElementById('backdrop-root'))}
        </React.Fragment>
    );

}

export default LoginModal;