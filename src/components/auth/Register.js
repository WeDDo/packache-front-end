import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

function Register() {
  const [username, setUsername] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

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

  async function registerUser(credetials) {
    await fetch('http://127.0.0.1:8000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credetials)
    })
      .then(data => data.json())
      .then((result) => {
        console.log(result);
      });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await registerUser({
      username,
      first_name: firstName,
      last_name: lastName,
      email,
      password
    });
    console.log(result)
    navigate('/login');
  }

  return (
    <div>
      <h1>Register here</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          First name:
          <input type="text" onChange={e => setFirstName(e.target.value)} />
        </label>
        <label>
          Last name:
          <input type="text" onChange={e => setLastName(e.target.value)} />
        </label>
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

export default Register;