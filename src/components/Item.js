import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import ItemUpdate from './ItemUpdate';

function Item(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [id, setId] = useState([]);
  const [name, setName] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(props)
    setId(props.id);
    setName(props.name);
    setIsLoaded(true);
  }, [])

  function reloadPage(){
    window.location.reload();
  }

  function updateDatabase() {
    fetch(`http://127.0.0.1:8000/api/items/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        navigate('/items');
        reloadPage();
      })
      .catch((error) => {
        setError(error);
        navigate('/items');
      });
  }

  function handleDeleteClick(event) {
    event.preventDefault();
    updateDatabase();
  }


  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link to={`/items/${id}`}>
        <div>ID: {id}</div>
        <div>Name: {name}</div>
      </Link>
      <Link to={`update/${id}`}><button type="button">Update</button></Link>
      <button type="button" onClick={handleDeleteClick}>Delete</button>
    </div>
  );

}

export default Item;