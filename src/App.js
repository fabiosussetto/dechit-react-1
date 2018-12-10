import React, { Component } from 'react';
// REDUX
import { connect } from "react-redux";
// import { store } from './state/store' //* importo lo store per il createStore di Redux // https://redux.js.org/api/createstore
// ROUTER
import { BrowserRouter as Router, Route } from "react-router-dom";
import { fetchTransactions } from './state/actions'

// STYLE
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
// COMPONENTS
import Home from './Home'
import Header from './Header'
import TransactionAddForm from './TransactionAddForm'
import TransactionList from './TransactionList'

// COMPONENTS
class App extends Component {

  //* elimino lo stato nel componente per spostarlo in redux
  // e creo un'azione e ne faccio il dispatch per gestirla in redux
  toggleCardExpanded = (transaction) => {
    this.props.dispatch({
      type: 'TOGGLE_CARD',
      payload: {transaction: transaction}
    });
  }

  componentDidMount () {
    this.props.dispatch(fetchTransactions())
  }

  //* elimino le funzioni callback che passavo a transactionList e le  metto direttamente dentro

  render() {

    const callbacks = {
      toggleCardExpanded: this.toggleCardExpanded
    }

    return (
        <Router>
          <div className="">
            <Header />
            <div className="container pt-4">
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

const ConnectedApp = connect()(App)

export default ConnectedApp
