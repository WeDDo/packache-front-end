import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ItemDetail = () => {
  const params = useParams();
  let id = params['id'];

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!getToken()) {
      navigate('/login');
    }

    fetch(`http://127.0.0.1:8000/api/items/${id}`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          setIsLoaded(true);
          setItem(result);
          setIsLoaded(true);
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

  if (item) {
    return (
      <div>
        <Link to="/items">
          <button className="btn btn-secondary m-1">Back</button>
        </Link>
        <div class="card m-1" style={{width:"18rem"}}>
          <div class="card-header">
            Item details
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Id: {item.id}</li>
            <li class="list-group-item">Name: {item.name}</li>
          </ul>
        </div>
      </div>
    );
  }
}
export default ItemDetail;