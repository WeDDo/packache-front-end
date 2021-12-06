import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

function Login({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState()

  const navigate = useNavigate();

  useEffect(() => {
    if (getToken()) {
      navigate('/orders');
    }

  })

  function getToken() {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.access_token;
  }

  async function loginUser(credetials) {
    let token = '';
    await fetch('https://packache-app.azurewebsites.net/api/login', {
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
    navigate('/orders');
  }

  return (
    <div className="w-25 mx-auto pt-2">
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input name="email" type="email" class="form-control" id="email" onChange={e => setEmail(e.target.value)} />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input name="password" type="password" class="form-control" id="password" onChange={e => setPassword(e.target.value)} />
        </div>
        <input type="submit" value="Submit" class="btn btn-primary"></input>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Login;