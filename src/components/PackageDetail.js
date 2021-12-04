import React, { useState, useEffect } from 'react';
import { useParams, Link  } from 'react-router-dom';

const PackageDetail = () => {
  const params = useParams();
  let id = params['id'];
  let orderId = params['orderId'];

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pack, setPack] = useState([]);
  const [item, setItem] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/orders/${orderId}/packages/${id}`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log('resultino');
          console.log(result.item);
          setIsLoaded(true);
          setPack(result);
          setItem(result.item);
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

  if (pack) {
    return (
      <div>
        <Link to={`/orders/${orderId}`}>
          <button className="ui button blue right">Back</button>
        </Link>
        <div>ID: {id}, ORDER_ID: {orderId}</div>
        <div>{pack.quantity_done}/{pack.quantity}</div>
        <div>{item.name}</div>
      </div>
    );
  }
}
export default PackageDetail;