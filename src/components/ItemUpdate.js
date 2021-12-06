import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";

function ItemUpdate() {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const params = useParams();
  let id = params['id'];

  const navigate = useNavigate();

  useEffect(() => {
    if(!getToken()){
      navigate('/login');
    }

    let headers = {"Content-Type":"application/json", "Authorization":`Bearer ${getToken()}`};

    fetch(`https://packache-app.azurewebsites.net/api/items/${id}`, {headers, })
      .then(res => res.json())
      .then(
        (result) => {
          console.log('result aaa');
          console.log(result.name);
          setIsLoaded(true);
          setName(result.name);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, []);

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
    fetch(`https://packache-app.azurewebsites.net/api/items/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "Authorization":`Bearer ${getToken()}`
      },
      body: JSON.stringify(postData),
    })
      .then(response => response.json())
      .then(name => {
        console.log('Success:', name);
        navigate('/items');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
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
            <input name="name" type="text" class="form-control" value={name} id="name" onChange={handleInputChange} />
          </div>
          <input type="submit" value="Submit" class="btn btn-primary"></input>
        </form>
      </div>
    </div>
  )
}
export default ItemUpdate;