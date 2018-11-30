import React, { Component } from 'react';
import { connect } from "react-redux";
import TransactionFilter from './TransactionFilter'

import 'bootstrap/dist/css/bootstrap.css'
import './App.css';

import TransactionList from './TransactionList'


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
    this.setState({
      transactions: []
    })
  }

  updateTitle = () => {
    this.setState({
      title: `Updated title ${Date.now()}`
    })
  }

  incrementAmount = (transactionId) => {
    const { transactions } = this.state
    
    const txIndex = transactions.findIndex((tx) => tx.id === transactionId)
    const txToUpdate = transactions[txIndex]
    
    const incrementedTx = { ...txToUpdate, amount: txToUpdate.amount + 10 }

    const newTransactions = [...transactions]
    newTransactions[txIndex] = incrementedTx

    this.setState({
      transactions: newTransactions
    })
  }

  render() {
    const { title, expandedTransactionIds } = this.state
    
    const callbacks = {
      onIncrementAmount: this.incrementAmount,
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
          title={title} 
          callbacks={callbacks}
        />
      </div>
    )
  }  
}

const ConnectedApp = connect()(App)

export default ConnectedApp