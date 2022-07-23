import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './login-view.scss';
import { RegistrationView } from '../registration-view/registration-view';




export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const [isShown, setIsShown] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    setIsShown(true);
  };




  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send a request to the server for authentication /
    // then call props.onLoggedIn(username) /
    props.onLoggedIn(username);
  };

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