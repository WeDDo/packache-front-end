import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as BoxLogo } from "../../assets/box.svg";

function Header() {

  return (
    <footer>
      <nav class="navbar fixed-bottom navbar-light bg-light">
        <div class="container-fluid">
          <div style={{fontFamily:"Anton", display:"inline-block"}}>© 2021 Packache Team</div>
        </div>
      </nav>
    </footer>

  )
}

export default Header;