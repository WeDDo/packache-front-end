import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import ItemUpdate from './ItemUpdate';

function Order(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [id, setId] = useState([]);
  const [recipient, setRecipient] = useState([]);
  const [packages, setPackages] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setId(props.id); //sito neissaugo kol neiseina is bloko?
    setRecipient(props.recipient);

    fetch(`http://127.0.0.1:8000/api/orders/${props.id}`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPackages(result.packages)
        },
        (error) => {
          setIsLoaded(true);
          setError(true);
        }
      )
  }, [])

  function reloadPage() {
    window.location.reload();
  }

  function updateDatabase() {
    fetch(`http://127.0.0.1:8000/api/orders/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        navigate('/orders');
        reloadPage();
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }

  function handleDeleteClick(event) {
    event.preventDefault();
    updateDatabase();
  }

  const packageList = packages.map((pack) =>
    <li key={pack.id}>
      {pack.id} {pack.quantity}
    </li>
  );

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link to={`/orders/${id}`}>
        <div>ID: {id}</div>
        <div>Recipient: {recipient}</div>
        <div>{packageList}</div>
      </Link>
      <Link to={`update/${id}`}><button type="button">Update</button></Link>
      <button type="button" onClick={handleDeleteClick}>Delete</button>
    </div>
  );

}

export default Order;