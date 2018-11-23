import React, { Component } from 'react';
import { fetchTransactions } from './state'

import 'bootstrap/dist/css/bootstrap.css'
import './App.css';

import TransactionList from './TransactionList'


class App extends Component {

  state = {
    title: 'My Bank Account',
    transactions: []
  }

  fetchData = () => {
    fetchTransactions()
      .then((resp) => {
        this.setState({
          transactions: resp.data
        })
      })
  }

  componentWillMount () {
    this.fetchData()
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

  addTransaction = () => {
    const newTransaction = { id: Date.now(), amount: 400, title: 'asdasd' }

    this.setState({
      transactions: [...this.state.transactions, newTransaction]
    })
  }

  render() {
    const { title, transactions } = this.state
    
    const callbacks = {
      onIncrementAmount: this.incrementAmount,
      onAddTransaction: this.addTransaction,
      onClearTransactions: this.clearTransactions
    }

    return (
      <TransactionList 
        transactions={transactions} 
        title={title} 
        callbacks={callbacks}
      />
    )
  }
  
}

export default App;
