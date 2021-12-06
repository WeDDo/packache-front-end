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
    if (!getToken()) {
      navigate('/login');
    }

    console.log(props)
    setId(props.id);
    setName(props.name);
    setIsLoaded(true);
  }, [])

  function getToken() {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.access_token;
  }

  function getUserRole(){
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.user.role;
  }

  function reloadPage() {
    window.location.reload();
  }

  function updateDatabase() {

    
    fetch(`http://127.0.0.1:8000/api/items/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization":`Bearer ${getToken()}`
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
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td><Link to={`/items/${id}`}><button type="button" className="btn btn-primary">View</button></Link></td>
      <td><Link to={`update/${id}`}><button type="button" className="btn btn-secondary">Update</button></Link></td>
      <td><button type="button" onClick={handleDeleteClick} className="btn btn-danger">Delete</button></td>
    </tr>
  );

}

export default Item;