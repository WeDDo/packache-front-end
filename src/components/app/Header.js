import React from "react";
import { Link } from "react-router-dom";
import {ReactComponent as BoxLogo} from "../../assets/box.svg";

function Header() {

  return (
    <header>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="navbar-brand mx-4">{< BoxLogo style={{ maxHeight:"25%", maxWidth:"25%" }} className="m-1" />}Packache</div>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <Link to="/orders" className="nav-link">Orders</Link>
          </li>
          <li class="nav-item">
            <Link to="/items" className="nav-link">Items</Link>
          </li>
        </ul>
      </div>
    </nav>
    </header>
  )
}

export default Header;