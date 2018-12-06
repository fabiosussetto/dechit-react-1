import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const MainMenu = () => {
  return(
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/addtransaction">Add Transactions</Link>
      </li>
      <li>
        <Link to="/transactions">Transactions List</Link>
      </li>
    </ul>
  )
}

export default MainMenu
