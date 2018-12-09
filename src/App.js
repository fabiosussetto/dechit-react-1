import React, { Component } from 'react';
import { connect } from "react-redux";
import TransactionFilter from './TransactionFilter'

import 'bootstrap/dist/css/bootstrap.css'
import './App.css';

import TransactionList from './TransactionList'
import * as actions from './state/actions'
import { getFilteredTransactions } from './state/selectors'


class App extends Component {

  state = {
    expandedTransactionIds: [],
  }

  toggleCardExpanded = (transaction) => {
    const {expandedTransactionIds} = this.state
    const index = expandedTransactionIds.indexOf(transaction.id)

    if (index === -1) {
      this.setState({
        expandedTransactionIds: [...expandedTransactionIds, transaction.id]
      })
      return
    }

    const updatedIds = [...expandedTransactionIds]
    updatedIds.splice(index, 1)

    this.setState({
      expandedTransactionIds: updatedIds
    })

  }

  clearTransactions = () => {
    this.props.dispatch(actions.clearTransactions());
  }

  incrementAmount = (transactionId) => {
    const { transactions } = this.props
    
    const txIndex = transactions.findIndex((tx) => tx.id === transactionId)
    const txToUpdate = transactions[txIndex]
    const incrementedTx = { ...txToUpdate, amount: txToUpdate.amount + 10 }
    const newTransactions = [...transactions]
    newTransactions[txIndex] = incrementedTx
    this.props.dispatch(actions.incrementAmount(newTransactions));
  }

  removeTransaction = (transactionId) => {
    const { transactions } = this.props
    const newTransactions = transactions.filter(transaction => transaction.id!==transactionId);
    this.props.dispatch(actions.removeTransaction(newTransactions));
  }

  render() {
    const { expandedTransactionIds } = this.state
    
    const callbacks = {
      onIncrementAmount: this.incrementAmount,
      onRemoveTransaction: this.removeTransaction,
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
          expandedIds={expandedTransactionIds}
          callbacks={callbacks}
        />
      </div>
    )
  }  
}

const mapStateToProps = (state) => {
  return {
    transactions: getFilteredTransactions(state),
  }
}

const ConnectedApp = connect(mapStateToProps)(App)

export default ConnectedApp