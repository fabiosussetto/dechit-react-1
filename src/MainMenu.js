import React from 'react'
import { Link } from "react-router-dom";

const MainMenu = () => {
  return(
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/transactions/new">New</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/transactions/list">List</Link>
      </li>
    </ul>
  )
}

export default MainMenu
