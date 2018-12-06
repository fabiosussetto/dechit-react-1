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
        <div className="">

        <nav className="navbar sticky-top navbar-expand navbar-light bg-light">
          <a className="navbar-brand" href="#">My Bank Account</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <MainMenu />
          </div>
        </nav>
          <hr />
          <div className="container">
          {/* TODO: sistemare il fatto che  se cambio rotta lo astato viene resettato
            e quindi in transactions/new il comportamento di TransactionAddForm non funziona
            perchè quan do torno nella lista non vedo nulla */}
            <div className="mt-2 mb-2">
              <TransactionAddForm />
            </div>
            <Route exact path="/" component={Home} />
            <Route path="/transactions/new" component={TransactionAddForm} />
            <Route path="/transactions/list"
                   render={props => <TransactionList {...props} callbacks={callbacks} />} />
          </div>

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
