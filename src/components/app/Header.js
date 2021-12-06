import React from "react";
import { Link } from "react-router-dom";
import {ReactComponent as BoxLogo} from "../../assets/box.svg";

function getToken() {
  const tokenString = localStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.access_token;
}

function Header() {

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="navbar-brand mx-4" style={{fontFamily:"Anton"}}>{< BoxLogo style={{ maxHeight:"25%", maxWidth:"25%" }} className="m-1" />}Packache</div>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link to="/orders" className="nav-link" style={{fontFamily:"Anton"}}>Orders</Link>
          </li>
          <li className="nav-item">
            <Link to="/items" className="nav-link" style={{fontFamily:"Anton"}}>Items</Link>
          </li>
          {getToken() != undefined ? <li className="nav-item">
            <Link to="/userinfo" className="nav-link" style={{fontFamily:"Anton"}}>User</Link>
          </li> : null }
          {getToken() != undefined ? <li className="nav-item">
          <Link to="/logout" className="nav-link" style={{fontFamily:"Anton"}}>Logout</Link>
          </li> : null }
        </ul>
      </div>
    </nav>
    </header>
  )
}

export default Header;