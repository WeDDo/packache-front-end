import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

function Login({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState()
  
  const navigate = useNavigate();

  useEffect(() => {
    if(getToken()){
      navigate('/');
    }
  })

  function getToken(){
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.access_token;
  }

  async function loginUser(credetials) {
    let token = '';
    await fetch('http://127.0.0.1:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credetials)
    })
      .then(data => data.json())
      .then((result) => {
        console.log(result);
        token = result;
      });

    return token;
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password
    });
    setToken(token);
    navigate('/');
  }

  return (
    <div>
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Login;