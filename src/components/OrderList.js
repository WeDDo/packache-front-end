import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'

import Order from './Order';


function OrderList(props) {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!getToken()) {
      navigate('/login');
    }

    let headers = {"Content-Type":"application/json", "Authorization":`Bearer ${getToken()}`};
    
    fetch('http://127.0.0.1:8000/api/orders', {headers, })
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setOrders(result);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      )
  }, [])

  function getToken() {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.access_token;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (orders) {
    const orderList = orders.map((order) =>
      <Order id={order.id} recipient={order.recipient} />
    );

    return (
      <div>
        <Link to="/orders/add">
          <button className="btn btn-success m-1">Create order</button>
        </Link>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Recipient</th>
              <th scope="col">Packages</th>
              <th scope="col">View</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {orderList}
          </tbody>
        </table>
      </div>
    );
  }
}

export default OrderList;