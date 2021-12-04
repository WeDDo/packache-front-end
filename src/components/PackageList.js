import React from 'react';
import { Link } from 'react-router-dom'

import Item from './Item';
import Package from './Package';

class PackageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      orderId: props.orderId,
      packages: []
    };
    console.log(props)
  }

  //method runs after the component output has been rendered to the DOM
  componentDidMount() {
    console.log(this.props.orderId);
    fetch(`http://127.0.0.1:8000/api/orders/${this.props.orderId}/packages`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            packages: result
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

    const { error, isLoaded, orderId, packages } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    if (!isLoaded) {
      return <div>Loading...</div>;
    }

    if (packages) {
      const packageList = this.state.packages.map((pack) =>
        <li key={pack.id}>
          <Package id={pack.id} orderId={orderId} />
        </li>
      );

      return (
        <div>
          <Link to={`/orders/${orderId}/packages/add`}>
            <button className="ui button blue right">Add package</button>
          </Link>
          <ul>
            {packageList}
          </ul>
        </div>

      );
    }
  }
}

export default PackageList;