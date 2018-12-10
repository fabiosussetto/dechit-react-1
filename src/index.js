import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { store } from './state/store'

import './index.css';
import App from './App';
import Menu from './Menu';
import Home from './Home';
import AddTransaction from './AddTransaction';

import {BrowserRouter as Router, Route} from 'react-router-dom';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Menu />
                <Route exact path="/" component={Home} />
                <Route path="/app" component={App} />
                <Route path="/addTransaction" component={AddTransaction} />
            </div>
        </Router>
    </Provider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();