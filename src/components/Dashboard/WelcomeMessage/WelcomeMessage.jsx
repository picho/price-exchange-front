function WelcomeMessage(props) {

  return (
    (props.isUserLogged) 
      ? <h1>You can use the exchange price app</h1>
      : <h1>Welcome to ArcelorMittal price exchange. Please, login to use the app</h1>
  );
}

export default WelcomeMessage;
