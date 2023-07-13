/**
 * @fileoverview this component renders the registration view. The component is exported and rendered in the main-view.jsx file.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import { Form, Button } from "react-bootstrap";
import axios from 'axios';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [password, setPassword] = useState('');
  
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');

  let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const validate = () => { let isReq = true; 
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    }
    else if (username.length < 5){
      setUsernameErr('Username must be atleast 5 charcters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    }
    else if(password.length < 6) {
      setPasswordErr('Password must be atleast 6 Characters long');
      isReq = false;
    }
    if (!email) {
      setEmailErr('Email Required');
      isReq = false;
    }
    else if(!email.match(emailFormat)) {
      setEmailErr('Please enter a valid email address');
      isReq = false;
  }

    return isReq;
  }

  /**
   *  @description handles the submit button to prevent the default refresh
   * @param {*} e 
   * @returns saves the user data in the database
   * @method: 'POST',
   * 
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const validInput = validate({ username, password, email });

    if (!validInput) {
      return null;
    }
      axios.post('https://fabiflix.herokuapp.com/users', {
          Username: username,
          Password: password,
          Email: email
      })
      .then(response => {
          const data = response.data;
          console.log(data);
          // window.open('/', '_self');
          /* the second argument_self is important
          so that the page will open in the new page.
          */
      })
      .catch(e => {
          console.log('error registering the user ');
          alert('something was not entered right');
      });
    props.onRegistered(false);
  };

  return (
    <form>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="password" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <Button type="submit" variant="primary"onClick={handleSubmit}>Submit</Button>
      <Button variant="secondary" type="submit">Login</Button>
    </form>
  );
}
RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
  }).isRequired,
  onRegistration: PropTypes.func.isRequired,
};