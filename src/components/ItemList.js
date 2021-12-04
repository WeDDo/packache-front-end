import React from 'react';
import { Link } from 'react-router-dom'

import Item from './Item';

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  //method runs after the component output has been rendered to the DOM
  componentDidMount() {
    fetch('http://127.0.0.1:8000/api/items')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  componentWillUnmount() {

  }

  render() {

    const { error, isLoaded, items } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    if (!isLoaded) {
      return <div>Loading...</div>;
    }
    if (items) {
      const itemList = this.state.items.map((item) =>
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
}

export default ItemList;