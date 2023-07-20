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
      axios.post('https://movie-api-evho.onrender.com/users', {
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
    <Form>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type='text'
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder='Enter a valid Username'
        />
        <p style={{color: "red"}}>{ usernameErr }</p>
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          minLength='8'
        />
        <p style={{color: "red"}}>{ passwordErr }</p>
      </Form.Group>
      <Form.Group className="group">
        <Form.Label>Email <address></address></Form.Label>
        <Form.Control
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <p style={{color: "red"}}>{ emailErr }</p>
      </Form.Group>
      <Button style={{marginRight: "10px"}} type="submit" variant="primary" onClick={handleSubmit}>Submit</Button>
      <Button variant="secondary" type="submit"> <Link to={"/"}>Login</Link></Button>
    </Form>
  );
}

RegistrationView.propTypes = {
  onRegistered: PropTypes.func.isRequired,};