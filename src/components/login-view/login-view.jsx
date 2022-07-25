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
    <React.Fragment>
      {isShown && <RegistrationView />}
      {!isShown && <Form>
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
      </Form>}
      </React.Fragment>
  );
}

