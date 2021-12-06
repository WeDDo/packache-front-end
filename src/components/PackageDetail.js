import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate  } from 'react-router-dom';

const PackageDetail = () => {
  const params = useParams();
  let id = params['id'];
  let orderId = params['orderId'];

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pack, setPack] = useState([]);
  const [item, setItem] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if(!getToken()){
      navigate('/login');
    }

    let headers = {"Content-Type":"application/json", "Authorization":`Bearer ${getToken()}`};

    fetch(`http://127.0.0.1:8000/api/orders/${orderId}/packages/${id}`, {headers, })
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPack(result);
          setItem(result.item);
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

  if (pack) {
    return (
      <div>
        <Link to={`/orders/${orderId}`}>
          <button className="btn btn-secondary m-1">Back</button>
        </Link>
        <div class="card m-1" style={{width:"18rem"}}>
          <div class="card-header">
            Package details
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Id: {id}</li>
            <li class="list-group-item">Order Id: {orderId}</li>
            <li class="list-group-item">Progress: {pack.quantity_done}/{pack.quantity}</li>
            <li class="list-group-item">Item: {item.name}</li>
          </ul>
        </div>
      </div>
    );
  }
}
export default PackageDetail;