import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'

import Package from './Package';

function PackageList(props) {
  const [packages, setPackages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!getToken()) {
      navigate('/login');
    }

    fetch(`http://127.0.0.1:8000/api/orders/${props.orderId}/packages`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPackages(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
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

  if (packages) {
    const packageList = packages.map((pack) =>
      <li key={pack.id}>
        <Package id={pack.id} orderId={props.orderId} />
      </li>
    );

    return (
      <div>
        <Link to={`/orders/${props.orderId}/packages/add`}>
          <button className="ui button blue right">Add package</button>
        </Link>
        <ul>
          {packageList}
        </ul>
      </div>
    );
  }
}

export default PackageList;