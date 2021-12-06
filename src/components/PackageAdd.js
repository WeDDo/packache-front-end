import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from "react-router-dom";

function PackageAdd() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [quantityDone, setQuantityDone] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [itemId, setItemId] = useState([]);
  const [items, setItems] = useState([]);

  const params = useParams();
  let orderId = params['orderId'];

  const navigate = useNavigate();

  useEffect(() => {
    if (!getToken()) {
      navigate('/login');
    }

    fetchItems();
  }, []);

  function getToken() {
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

    let headers = {"Content-Type":"application/json", "Authorization":`Bearer ${getToken()}`};

    fetch('http://127.0.0.1:8000/api/items', {headers, })
      .then(res => res.json())
      .then(
        (result) => {
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
    fetch(`http://127.0.0.1:8000/api/orders/${orderId}/packages/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization":`Bearer ${getToken()}`
      },
      body: JSON.stringify(postData),
    })
      .then(response => response.json())
      .then(() => {
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
        <button className="btn btn-secondary m-1">Back</button>
      </Link>

      <div className="w-25 mx-auto pt-2">
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="quantityDone" class="form-label">Quantity done</label>
            <input name="quantity-done" type="number" class="form-control" id="quantityDone" aria-describedby="quantityDone" onChange={handleInputQuantityDoneChange} />
          </div>
          <div class="mb-3">
            <label for="quantity" class="form-label">Quantity</label>
            <input name="quantity" type="number" class="form-control" id="quantity" onChange={handleInputQuantityChange}/>
          </div>
          <div class="mb-3">
            <label for="itemSelect" class="form-label">Item</label>
            <select id="itemSelect" class="form-control" value={itemId} onChange={handleInputItemChange}>
              <option value="" selected disabled hidden>Choose item</option>
              {itemOptions}
            </select>
          </div>
          <input type="submit" value="Submit" class="btn btn-primary"></input>
        </form>
      </div>

    </div>
  )
}
export default PackageAdd;