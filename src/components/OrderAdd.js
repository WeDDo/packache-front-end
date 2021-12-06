import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";

function OrderAdd() {
  const [recipient, setRecipient] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!getToken()) {
      navigate('/');
    }
  })

  function getToken() {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.access_token;
  }

  function handleSubmit(event) {
    event.preventDefault();
    updateDatabase();
  }

  function handleInputChange(event) {
    const target = event.target;
    setRecipient(target.value);
  }

  function updateDatabase() {
    const postData = { recipient: recipient };

    let headers = {"Content-Type":"application/json", };

    fetch('http://127.0.0.1:8000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization":`Bearer ${getToken()}`
      },
      body: JSON.stringify(postData),
    })
      .then(response => response.json())
      .then(recipient => {
        console.log('Success:', recipient);
        navigate('/orders');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div>
      <Link to="/orders">
        <button className="btn btn-secondary m-1">Back</button>
      </Link>
      <div className="w-25 mx-auto pt-2">
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="recipient" class="form-label">Recipient</label>
            <input name="recipient" type="text" class="form-control" id="recipient" onChange={handleInputChange} />
          </div>
          <input type="submit" value="Submit" class="btn btn-primary"></input>
        </form>
      </div>
    </div>

  )
}
export default OrderAdd;