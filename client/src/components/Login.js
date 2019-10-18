import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { Form, Container } from 'semantic-ui-react';

const emptyForm = { username: '', password: ''}

const Login = props => {
  const [credentials, setCredentials] = useState(emptyForm)

  const handleChange = event => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault();
    axiosWithAuth().post('/login', credentials)
    .then(res => {
      localStorage.setItem('token', res.data.payload);
      setCredentials(emptyForm);
      props.history.push('/bubbles')
    })
    .catch(err => console.log(err))
  }
  return (
    <div className="loginpage">
    <Container>
      <h1>Welcome to the Bubble App!</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
        <input
        type="text"
        name="username"
        placeholder="username"
        value={credentials.username}
        onChange={handleChange}
        />
        </Form.Field>
        <Form.Field>
        <input
        type="password"
        name="password"
        placeholder="password"
        value={credentials.password}
        onChange={handleChange}
        />
        </Form.Field>
        <Form.Button type="submit" color="blue" content="Login" />
      </Form>
    </Container>
    </div>
  );
};

export default Login;
