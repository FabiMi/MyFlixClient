import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

import propTypes from 'prop-types';
import axios from 'axios';



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
    // Send a request to the server for authentication 
    axios.post('https://fabiflix.herokuapp.com/login', {
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


  return (
    <React.Fragment>
      <Form>
        <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
          <Form.Control type="text" placeholder="Enter Username" value={username} onChange={e => setUsername(e.target.value)} />
          <p style={{color: "red"}}>{ usernameErr }</p>
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <p style={{color: "red"}}>{ passwordErr }</p>
      </Form.Group>
      <Button type="submit" variant="primary" style={{marginRight: "10px"}} onClick={handleSubmit}>Submit</Button>
      <Button type="submit" variant="secondary"><Link to={"/register"}>Register</Link></Button>
      </Form>
      </React.Fragment>
  );
}
