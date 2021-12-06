import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'

import Item from './Item';


function ItemList(props) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!getToken()) {
      navigate('/login');
    }

    let headers = {"Content-Type":"application/json", "Authorization":`Bearer ${getToken()}`};

    fetch('http://127.0.0.1:8000/api/items', {headers, })
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

  function getToken() {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.access_token;
  }

  function getUserRole(){
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.user.role;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (items) {
    const itemList = items.map((item) =>
      <Item id={item.id} name={item.name} />
    );

    return (
      <div>
        {getUserRole() == 'admin' ? <Link to="/items/add">
          <button className="btn btn-success m-1">Add Item</button>
        </Link> : null }
        

        <table className="table mb-5">
          <thead className="thead-light">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">View</th>
              {getUserRole() == 'admin' ? <th scope="col">Update</th> : null }
              {getUserRole() == 'admin' ? <th scope="col">Delete</th> : null }
            </tr>
          </thead>
          <tbody>
            {itemList}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ItemList;