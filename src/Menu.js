import React from 'react';
import {Link} from 'react-router-dom';

const Menu = () => {
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item nav-link"><Link to="/">{'Home'}</Link></li>
                    <li className="nav-item nav-link"><Link to="/app">{'App'} </Link></li>
                    <li className="nav-item nav-link"><Link to="/addTransaction">{'AddTransaction'}</Link></li>
                </ul>
            </div>
        </nav>
    )
};

export default Menu;