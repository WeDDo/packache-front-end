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

    let headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`,
    };

    fetch('https://packache-app.azurewebsites.net/api/orders', { headers, })
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

  function getUserRole() {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.user.role;
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
        {getUserRole() == 'admin' ? <Link to="/orders/add">
          <button className="btn btn-success m-1">Create order</button>
        </Link> : null}


        <table className="table mb-5">
          <thead className="thead-light">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Recipient</th>
              <th scope="col">Packages</th>
              <th scope="col">View</th>
              {getUserRole() == 'admin' ? <th scope="col">Update</th> : null}
              {getUserRole() == 'admin' ? <th scope="col">Delete</th> : null}
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