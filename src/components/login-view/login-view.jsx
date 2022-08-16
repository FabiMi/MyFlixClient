import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import propTypes from 'prop-types'
import axios from 'axios'


import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

   //Hook for the inputs
   const [usernameErr, setUsernameErr] = useState('');
   const [passwordErr, setPasswordErr] = useState('');

  

  const handleRegister = (e) => {
    e.preventDefault()
    props.onRegistered(true)
  }


  const validate = () => { let isReq = true; 
    if(!username){setUsernameErr('Username Required');
  isReq = false;}
else if (username.length < 2){
  setUsernameErr('Username must be 2 charcters long');
  isReq = false;
}
if(!password) {setPasswordErr('Password Required');
isReq = false;}
else if(password.length < 6) {
  setPassword('Password must be 6 Characters long');
  isReq = false;
}

return isReq;}

  const handleSubmit = (e) => {
    e.preventDefault();
    
        props.onLoggedIn(username);
      }
      
    


  return (
    <React.Fragment>
      <Form>
        <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" placeholder="Enter Username" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Button type="submit" variant="primary"  onClick={handleSubmit}>Submit</Button>
      <Button type="submit" variant="secondary" onClick={handleRegister}>Register</Button>
      </Form>
      </React.Fragment>
  );
}
