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
    if (!getToken()) {
      navigate('/login');
    }

    let headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`,
    };

    fetch(`https://packache-app.azurewebsites.net/api/orders/${id}`, {headers, })
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

  function getToken() {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.access_token;
  }

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

    fetch(`https://packache-app.azurewebsites.net/api/orders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${getToken()}`,
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
        <button className="btn btn-secondary m-1">Back</button>
      </Link>
      <div className="w-25 mx-auto pt-2">
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="recipient" class="form-label">Recipient</label>
            <input name="recipient" type="text" class="form-control" id="recipient" value={recipient} onChange={handleInputChange} />
          </div>
          <input type="submit" value="Submit" class="btn btn-primary"></input>
        </form>
      </div>
    </div>
  )
}
export default OrderUpdate;