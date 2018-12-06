import React, { Component } from 'react';
import { connect } from "react-redux";
import TransactionFilter from './TransactionFilter'

import 'bootstrap/dist/css/bootstrap.css'
import './App.css';

import TransactionList from './TransactionList'


class App extends Component {

  //* elimino lo stato nel componente per spostarlo in redux
  state = {
    //expandedTransactionIds: [1],
  }

  //* creo un'azione e ne faccio il dispatch per gestirla in redux
  toggleCardExpanded = (transaction) => {
    this.props.dispatch({
      type: 'TOGGLE_CARD',
      //* inserisco i parametri che mi serve passare al reducer
      //* (in questo caso dentro a payload, ma è una convenzione)
      payload: {transaction: transaction}
    })
  }

  clearTransactions = () => {
    this.setState({
      transactions: []
    })
  }

  updateTitle = () => {
    this.setState({
      title: `Updated title ${Date.now()}`
    })
  }

  render() {

    const callbacks = {
      onClearTransactions: this.clearTransactions,
      toggleCardExpanded: this.toggleCardExpanded
    }

    return (
      <div className="container">
        <h2>My Bank Account</h2>
        <div className="mt-2 mb-2">
          <TransactionFilter />
        </div>
        <TransactionList
          callbacks={callbacks}
        />
      </div>
    )
  }
}

const ConnectedApp = connect()(App)

export default ConnectedApp
