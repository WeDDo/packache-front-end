import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";

function ItemAdd() {
  const [name, setName] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!getToken()) {
      navigate('/login');
    }
  })

  function getToken() {
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
        <button className="btn btn-secondary m-1">Back</button>
      </Link>

      <div className="w-25 mx-auto pt-2">
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input name="name" type="text" class="form-control" id="name" onChange={handleInputChange} />
          </div>
          <input type="submit" value="Submit" class="btn btn-primary"></input>
        </form>
      </div>
    </div>
  )
}
export default ItemAdd;