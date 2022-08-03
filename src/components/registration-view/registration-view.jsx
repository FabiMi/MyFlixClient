import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Button } from "react-bootstrap";

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email);
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
  onRegistered: PropTypes.func.isRequired,
};