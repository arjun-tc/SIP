/* eslint-disable jsx-a11y/anchor-is-valid */
import './App.css';
import React, { useEffect } from 'react';
import Login from "./components/login";
import Signup from "./components/signup";
import * as Realm from 'realm-web';
import { useNavigate } from "react-router-dom";


function App() {
  let navigate = useNavigate();


  
useEffect(() => {
  const signUpButton = document.getElementById('signUp');
  const signInButton = document.getElementById('signIn');
  const container = document.getElementById('container');
 signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
}); 

async function fetchData(){
  try {
    const app = new Realm.App({ id: "groot-scnkt" });
    const credentials = Realm.Credentials.anonymous();
    const loginId = localStorage.getItem('loginId') || 'dsfsdfsdfsdf';
    const user = await app.logIn(credentials);
    const isUserActive = await user.functions.isUserActive(loginId);
    console.log('hari');
    if(Boolean(isUserActive.length)) {
      navigate("/dashboard");
    } else{
      navigate("");
    }
  } catch(err) {
    console.error("Failed to log in", err);
  }
}

fetchData();

}, [navigate]);

  return (
    <><div className="container" id="container">
      <div className="form-container sign-up-container">
        <Signup />
      </div>
      <div className="form-container sign-in-container">
      <Login />
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="ghost" id="signIn">Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button className="ghost" id="signUp">Sign Up</button>
          </div>
        </div>
      </div>
    </div><footer>
        <p>
          <a target="_blank" href="https://florin-pop.com" rel="noreferrer">SIP</a>
          -Simple Invesment Plan
        </p>
      </footer></>
  );
}

export default App;
