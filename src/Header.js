import React from 'react'
import { Link } from "react-router-dom";
import MainMenu from './MainMenu'

const Header = (props) => {
    return (
      <nav className="navbar sticky-top navbar-expand navbar-light bg-light">
        <Link className="navbar-brand btn btn-link" to="/">My Bank Account</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <MainMenu
          listClass="navbar-nav ml-auto mr-2"
          elemsClass="nav-item"
          linksClass="nav-link"
        />
        </div>
      </nav>
    )
}

export default Header
