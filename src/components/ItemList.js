import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'

import Item from './Item';


function ItemList(props){
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if(!getToken()){
      navigate('/login');
    }

    fetch('http://127.0.0.1:8000/api/items')
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
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
  
  if (items) {
    const itemList = items.map((item) =>
      <li key={item.id}>
        <Item id={item.id} name={item.name} />
      </li>
    );

    return (
      <div>
        <Link to="/items/add">
          <button className="ui button blue right">Add Item</button>
        </Link>
        <ul>
          {itemList}
        </ul>
      </div>
    );
  }
}

export default ItemList;