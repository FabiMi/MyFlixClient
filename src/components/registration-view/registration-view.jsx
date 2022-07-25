import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { FormControl, FormLabel } from 'react-bootstrap';
import PropTypes from 'prop-types';



export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email);
    props.onLoggedIn(username);
  };

  return (
    <Form>
      <Form.Group controlId="formUsername">
      <Form.Label>Username:</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </Form.Group>

      <Form.Group controlId="formEmail">
      <Form.Label> Email:</Form.Label>
        <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </Form.Group>

      <Form.Group controlId= "formPassword">
      <FormLabel> Password:</FormLabel>
      <FormControl type="password" value={password} onChange={e => setPassword(e.target.value)}/>
     </Form.Group>

      <Button type="submit" value={register} variant="primary"onClick={handleSubmit}>Submit</Button>
      <Button variant="secondary" type="submit">Login</Button>
    </Form>
  );
}
RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired
  }),
};