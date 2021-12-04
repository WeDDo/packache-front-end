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
    fetch(`http://127.0.0.1:8000/api/items/${id}`)
      .then(res => res.json())
      .then(
        (result) => {
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
    fetch(`http://127.0.0.1:8000/api/items/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
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
        <button className="ui button blue right">Back</button>
      </Link>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input name="name" type="text" onChange={handleInputChange} value={name}></input>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>

  )
}
export default ItemUpdate;