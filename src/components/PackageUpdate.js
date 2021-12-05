import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from "react-router-dom";

function PackageUpdate() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [quantityDone, setQuantityDone] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [itemId, setItemId] = useState([]);
  const [items, setItems] = useState([]);

  const params = useParams();
  let id = params['id'];
  let orderId = params['orderId'];

  const navigate = useNavigate();

  useEffect(() => {
    if(!getToken()){
      navigate('/login');
    }

    fetch(`http://127.0.0.1:8000/api/orders/${orderId}/packages/${id}`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setQuantityDone(result.quantity_done);
          setQuantity(result.quantity);
          setItemId(result.item.id);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
    fetchItems();
  }, []);

  function getToken(){
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.access_token;
  }

  function handleSubmit(event) {
    event.preventDefault();
    updateDatabase();
  }

  function handleInputQuantityDoneChange(event) {
    const target = event.target;
    setQuantityDone(target.value);
  }

  function handleInputQuantityChange(event) {
    const target = event.target;
    setQuantity(target.value);
  }

  function handleInputItemChange(event) {
    const target = event.target;
    setItemId(target.value);
  }

  function fetchItems() {
    fetch('http://127.0.0.1:8000/api/items')
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          setItems(result);
          setIsLoaded(true);
        },
        (error) => {
          console.error(error);
          setError(true);
        }
      )
  }

  function updateDatabase() {
    const postData = { quantity_done: quantityDone, quantity, item_id: itemId, order_id: orderId };
    console.log(postData);
    fetch(`http://127.0.0.1:8000/api/orders/${orderId}/packages/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then(response => response.json())
      .then(() => {
        console.log('Success!');
        navigate(`/orders/${orderId}`);
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

  const itemOptions = items.map((it) =>
    <option value={it.id}>{it.name}</option>
  );

  return (
    <div>
      <Link to={`/orders/${orderId}`}>
        <button className="ui button blue right">Back</button>
      </Link>
      <form onSubmit={handleSubmit}>
        <label>
          Quantity done:
          <input name="quantity-done" type="number" value={quantityDone} onChange={handleInputQuantityDoneChange}></input>
        </label>
        <label>
          Quantity:
          <input name="quantity" type="number" value={quantity} onChange={handleInputQuantityChange}></input>
        </label>
        <label>
          Item:
          <select value={itemId} onChange={handleInputItemChange}>
          <option value="" selected disabled hidden>Choose item</option>
            {itemOptions}
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>

  )
}
export default PackageUpdate;