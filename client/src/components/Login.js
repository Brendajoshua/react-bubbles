import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

const emptyForm = { username: '', password: ''}

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
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
    })
    .catch(err => console.log(err))
  }
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <input
        type="text"
        name="username"
        placeholder="username"
        value={credentials.username}
        onChange={handleChange}
        />
        <input
        type="password"
        name="password"
        placeholder="password"
        value={credentials.password}
        onChange={handleChange}
        />
        <button type="submit">Log in</button>
      </form>
    </>
  );
};

export default Login;
