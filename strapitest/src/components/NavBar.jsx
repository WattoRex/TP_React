import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/AppStrapi">AppStrapi</Link>
        </li>
        <li>
          <Link to="/AppStrapiTuto">AppStrapiTuto</Link>
        </li>
        <li>
          <Link to="/AppTP">AppTP</Link>
        </li>
        <li>
          <Link to="/AppTPAxios">AppTPAxios</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
