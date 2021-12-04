import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";

function OrderUpdate() {
  const [recipient, setRecipient] = useState('');
  const [packages, setPackages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const params = useParams();
  let id = params['id'];

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/orders/${id}`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          setIsLoaded(true);
          setRecipient(result.recipient);
          setPackages(result.packages);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )  
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    updateDatabase();
  }

  function handleInputChange(event) {
    const target = event.target;

    setRecipient(target.value);
  }

  function updateDatabase() {
    const postData = { recipient, packages };

    fetch(`http://127.0.0.1:8000/api/orders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then(response => response.json())
      .then(() => {
        console.log('Success:');
        navigate('/orders');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link to="/orders">
        <button className="ui button blue right">Back</button>
      </Link>
      <form onSubmit={handleSubmit}>
        <label>
          Recipient:
          <input name="name" type="text" onChange={handleInputChange} value={recipient}></input>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>

  )
}
export default OrderUpdate;