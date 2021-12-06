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

    let headers = {"Content-Type":"application/json", "Authorization":`Bearer ${getToken()}`};

    fetch(`https://packache-app.azurewebsites.net/api/orders/${props.orderId}/packages`, {headers, })
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
      <Package id={pack.id} orderId={props.orderId} />
    );

    return (
      <div>
        <Link to={`/orders/${props.orderId}/packages/add`}>
          <button className="btn btn-success m-1">Add package</button>
        </Link>
        <table className="table mb-5">
          <thead className="thead-light">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Quantity</th>
              <th scope="col">Item</th>
              <th scope="col">View</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {packageList}
          </tbody>
        </table>
      </div>
    );
  }
}

export default PackageList;