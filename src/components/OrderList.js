import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom'

import Order from './Order';


function OrderList(props){
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if(!getToken()){
      navigate('/login');
    }

    fetch('http://127.0.0.1:8000/api/orders')
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          setIsLoaded(true);
          setOrders(result);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      )
  }, [])

  function getToken(){
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
      <li key={order.id}>
        <Order id={order.id} recipient={order.recipient} />
      </li>
  );

    return (
      <div>
        <Link to="/orders/add">
          <button className="ui button blue right">Create order</button>
        </Link>
        <ul>
          {orderList}
        </ul>
      </div>

    );
  }
}

export default OrderList;