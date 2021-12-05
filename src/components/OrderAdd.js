import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";

function OrderAdd() {
  const [recipient, setRecipient] = useState([]);

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
    fetch('http://127.0.0.1:8000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
        <button className="ui button blue right">Back</button>
      </Link>
      <form onSubmit={handleSubmit}>
        <label>
          Recipient:
          <input name="name" type="text" onChange={handleInputChange}></input>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>

  )
}
export default OrderAdd;