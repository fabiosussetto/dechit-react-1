import React, { Component } from 'react';
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import TransactionFilter from './TransactionFilter'
import TransactionAddForm from './TransactionAddForm'
import { toggleCard } from './state/actions'

import 'bootstrap/dist/css/bootstrap.css'
import './App.css';

import TransactionList from './TransactionList'
import MainMenu from './MainMenu'


class App extends Component {

  //* elimino lo stato nel componente per spostarlo in redux

  //* creo un'azione e ne faccio il dispatch per gestirla in redux
  toggleCardExpanded = (transaction) => {
    this.props.dispatch(toggleCard(transaction));
  }

  //* elimino le funzioni callback che passavo a transactionList e le  metto direttamente dentro

  render() {

    const callbacks = {
      toggleCardExpanded: this.toggleCardExpanded
    }

    return (
      <Router>
        <div className="container">
          <h2>My Bank Account</h2>
          <hr />
          <MainMenu />
          <hr />
          <div className="mt-2 mb-2">
            <TransactionFilter />
          </div>
          <div className="mt-2 mb-2">
          </div>
          <Route exact path="/" component={Home} />
          <Route path="/addtransaction" component={TransactionAddForm} />
          <Route path="/transactions"
                 render={props => <TransactionList {...props} callbacks={callbacks} />} />

        </div>
      </Router>
    )
  }
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

const ConnectedApp = connect()(App)

export default ConnectedApp
