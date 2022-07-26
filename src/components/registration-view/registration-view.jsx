import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';



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