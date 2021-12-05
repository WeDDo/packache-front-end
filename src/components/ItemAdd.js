import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";

function ItemAdd() {
  const [name, setName] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if(!getToken()){
      navigate('/login');
    }
  })

  function getToken(){
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.access_token;
  }

  function handleSubmit(event) {
    event.preventDefault();
    addItemToDatabase();
  }

  function handleInputChange(event) {
    const target = event.target;
    setName(target.value);
  }

  function addItemToDatabase() {
    const postData = { name };
    fetch('http://127.0.0.1:8000/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then(response => response.json())
      .then(() => {
        navigate('/items');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div>
      <Link to="/items">
        <button className="ui button blue right">Back</button>
      </Link>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input name="name" type="text" onChange={handleInputChange}></input>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>

  )
}
export default ItemAdd;