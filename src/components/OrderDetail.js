import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate  } from 'react-router-dom';
import PackageList from './PackageList';

const OrderDetail = () => {
  const params = useParams();
  let id = params['id'];

  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    if(!getToken()){
      navigate('/login');
    }

    fetch(`http://127.0.0.1:8000/api/orders/${id}`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          setIsLoaded(true);
          setOrder(result);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
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

  if (order) {
    return (
      <div>
        <Link to="/orders">
          <button className="ui button blue right">Back</button>
        </Link>
        <div>ID: {order.id}</div>
        <div>Name: {order.recipient}</div>
        <div><PackageList orderId={id} /></div>
      </div>
    );
  }
}
export default OrderDetail;