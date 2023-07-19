/** 
 @fileoverview The LoginView component allows the user to log in. The component is exported and rendered in the main-view.jsx file.
 */

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import propTypes from 'prop-types';
import axios from 'axios';

import './login-view.scss';


/**
 * @description renders the login view
 * @function LoginView
 * @param {string} props - onLoggedIn
 * @returns {LoginView}
 */

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

   //Hook for the inputs
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  
/** 
 * handle the submit button to prevent the default refresh
 */
  const handleRegister = (e) => {  // 
    e.preventDefault()
    props.onRegistered(true)
  }

  /**
   * @description validates the input fields
    * @function validate
    * @param {string} username
    * @param {string} password
    * @returns {boolean}
   */
  const validate = () => { let isReq = true; 
    if(!username){setUsernameErr('Username Required');
    isReq = false;}
    else if (username.length < 5){
      setUsernameErr('Username must be atleast 5 charcters long');
      isReq = false;
    }
    if(!password) {setPasswordErr('Password Required');
    isReq = false;}
    else if(password.length < 6) {
      setPasswordErr('Password must be atleast 6 Characters long');
      isReq = false;
  }

    return isReq;
  }




  const handleSubmit = (e) => {
    e.preventDefault();
    const validInput = validate({ username, password });

    if (!validInput) {
      return null;
    }
    // Send a request to the server for authentication with axios
    axios.post('https://movie-api-evho.onrender.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      console.log(response)
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  }




  /**
   * @description renders the login view form, login button and  the register button
   * @function render
   * @returns {LoginView}
   */
  return (
    <div>
      {isShown && <RegistrationView />}
      {!isShown && <form>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <Button type="submit" variant="primary"  onClick={handleSubmit}>Submit</Button>
      <Button type="submit" variant="secondary" onClick={handleRegister}>Register</Button>
    </form>}
    </div>
  );
}