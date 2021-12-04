import React from 'react';
import { Link } from 'react-router-dom'

import Order from './Order';

class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      orders: []
    };
  }

  //method runs after the component output has been rendered to the DOM
  componentDidMount() {
    fetch('http://127.0.0.1:8000/api/orders')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            orders: result
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

    const { error, isLoaded, orders: orders } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    if (!isLoaded) {
      return <div>Loading...</div>;
    }
    if (orders) {
      const orderList = this.state.orders.map((order) =>
        <li key={order.id}>
          <Order id={order.id} recipient={order.recipient} />
        </li>
      );

      return (
        <div>
          <Link to="/orders/add">
            <button className="ui button blue right">Create order</button>
          </Link>
          <ul>
            {orderList}
          </ul>
        </div>

      );
    }
  }
}

export default OrderList;