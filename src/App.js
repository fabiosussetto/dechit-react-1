import React, { Component } from 'react';
import { connect } from "react-redux";
import TransactionFilter from './TransactionFilter'
import TransactionAddForm from './TransactionAddForm'
import { toggleCard } from './state/actions'

import 'bootstrap/dist/css/bootstrap.css'
import './App.css';

import TransactionList from './TransactionList'


class App extends Component {

  //* elimino lo stato nel componente per spostarlo in redux
  //state = {
    //expandedTransactionIds: [1],
  //}

  //* creo un'azione e ne faccio il dispatch per gestirla in redux
  toggleCardExpanded = (transaction) => {
    this.props.dispatch(toggleCard(transaction));
    /*this.props.dispatch({
      type: 'TOGGLE_CARD',
      //* inserisco i parametri che mi serve passare al reducer
      //* (in questo caso dentro a payload, ma è una convenzione)
      payload: {transaction: transaction}
    })
    */
  }

  //* elimino le funzioni callback che passavo a transactionList e le  metto direttamente dentro

  updateTitle = () => {
    this.setState({
      title: `Updated title ${Date.now()}`
    })
  }

  render() {

    const callbacks = {
      toggleCardExpanded: this.toggleCardExpanded
    }

    return (
      <div className="container">
        <h2>My Bank Account</h2>
        <div className="mt-2 mb-2">
          <TransactionFilter />
        </div>
        <div className="mt-2 mb-2">
          <TransactionAddForm />
        </div>
        <TransactionList  callbacks={callbacks} />
      </div>
    )
  }
}

const ConnectedApp = connect()(App)

export default ConnectedApp
