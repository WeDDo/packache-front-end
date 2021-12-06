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
    if (getToken()) {
      navigate('/');
    }
  })

  function getToken() {
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
      <div className="w-25 mx-auto pt-2">
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input name="username" type="text" class="form-control" id="username" onChange={e => setUsername(e.target.value)} />
          </div>
          <div class="mb-3">
            <label for="firstname" class="form-label">First Name</label>
            <input name="firstname" type="text" class="form-control" id="firstname" onChange={e => setFirstName(e.target.value)} />
          </div>
          <div class="mb-3">
            <label for="lastname" class="form-label">Last Name</label>
            <input name="lastname" type="text" class="form-control" id="lastname" onChange={e => setLastName(e.target.value)} />
          </div>
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
    </div>
  )
}

export default Register;