import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'

function Package(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [id, setId] = useState([]);
  const [quantityDone, setQuantityDone] = useState(0);
  const [quantity, setQuantity] = useState([]);
  const [orderId, setOrderId] = useState([]);
  const [item, setItem] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    let headers = {"Content-Type":"application/json", "Authorization":`Bearer ${getToken()}`};

    fetch(`http://127.0.0.1:8000/api/orders/${props.orderId}/packages/${props.id}`, {headers, })
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setId(result.id);
          setQuantityDone(result.quantity_done);
          setQuantity(result.quantity);
          setOrderId(result.order_id);
          setItem(result.item);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  function reloadPage() {
    window.location.reload();
  }

  function getToken(){
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.access_token;
  }

  function updateDatabase() {
    fetch(`http://127.0.0.1:8000/api/orders/${orderId}/packages/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization":`Bearer ${getToken()}`
      },
    })
      .then(() => {
        navigate(`/orders/${orderId}`);
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

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <tr>
      <td>{id}</td>
      <td>{quantityDone}/{quantity}</td>
      <td>{item.name}</td>
      <td><Link to={`/orders/${orderId}/packages/${id}`}><button type="button" className="btn btn-primary">View</button></Link></td>
      <td><Link to={`/orders/${orderId}/packages/update/${id}`}><button type="button" className="btn btn-secondary">Update</button></Link></td>
      <td><button type="button" onClick={handleDeleteClick} className="btn btn-danger">Delete</button></td>
    </tr>
  );
}

export default Package;