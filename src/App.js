import { useState } from "react";

import logo from './Arcelormittal-logo.png';
import './App.css';

import LoginModal from './components/UI/LoginModal';
import WelcomeMessage from './components/WelcomeMessage';
import Button from './components/UI/Button';

function App() {

  const [isUserLogged, setIsUserLogged] = useState(false);
  const [isLoginModalClose, setIsLoginModalClose] = useState(true);

  const openModal = () => {
    setIsLoginModalClose(false);
  }

  const closeModal = () => {
    setIsLoginModalClose(true);
  }

  const buildAppBody = () => {
    
    return (!isUserLogged) 
    ? (<div className="Welcome-message">
        <WelcomeMessage />
      </div>) 
    : (<div>hola</div>)
  }

  const submitUser = () => {}

  return (
    <div className="App">
      <header className="App-header">
          <div className='Logo-header'>
            <img src={logo} className="App-logo" alt="logo" />
            <p className='title'>ArcelorMitall</p>
          </div>
          <Button onClick={openModal}>Login</Button>
      </header>
      <div className="Body">
        {buildAppBody()}
      </div>
      <footer className="footer">Ernesto Petit - AcerlorMitall 2022.</footer>
      {!isLoginModalClose && <LoginModal title="Login" onCloseModal={closeModal}/>}
    </div>
  );
}

export default App;
