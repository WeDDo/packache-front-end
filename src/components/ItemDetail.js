import React, { useState, useEffect } from 'react';
import { useParams, Link  } from 'react-router-dom';

const ItemDetail = () => {
  const params = useParams();
  let id = params['id'];

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState([]);

  useEffect(() => {
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
          <button className="ui button blue right">Back</button>
        </Link>
        <div>ID: {item.id}</div>
        <div>Name: {item.name}</div>
      </div>
    );
  }
}
export default ItemDetail;