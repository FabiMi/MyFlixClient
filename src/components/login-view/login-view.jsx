import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
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
    const isReq = validate();
    if (isReq) {
      axios.post('http://fabiflix.herokuapp.com/login', {
        Username: username,
        Password: password
      }) .then(response =>{
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
      });
    }
  };

  return (
    <div>
      <form>
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
    </form>
    </div>
  );
  
}
