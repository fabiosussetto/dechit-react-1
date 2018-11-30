import React, { Component } from 'react';
import { fetchTransactions } from './state'

import 'bootstrap/dist/css/bootstrap.css'
import './App.css';

import TransactionList from './TransactionList'


class App extends Component {

  state = {
    title: 'My Bank Account',
    transactions: [],
    filterAmount: null,
    expandedTransactionIds: [],
  }

  fetchData = () => {
    fetchTransactions()
      .then((resp) => {
        this.setState({
          transactions: resp.data
        })
      })
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
      // expandedTransactionIds: expandedTransactionIds.filter((t, txIndex) => txIndex !== index)
    })

  }

  getFilteredTransactions () {
    const { transactions, filterAmount } = this.state
    if (!filterAmount) {
      return transactions
    }
    return transactions.filter(transaction => transaction.amount > filterAmount)
  }

  componentWillMount () {
    this.fetchData()
  }

  clearTransactions = () => {
    this.setState({
      transactions: []
    })
  }

  onFilterSubmit = (amount) => {
    this.setState({
      filterAmount: amount
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
    const { title, expandedTransactionIds } = this.state
    
    const callbacks = {
      onIncrementAmount: this.incrementAmount,
      onAddTransaction: this.addTransaction,
      onClearTransactions: this.clearTransactions,
      onFilterSubmit: this.onFilterSubmit,
      toggleCardExpanded: this.toggleCardExpanded
    }

    const transactions = this.getFilteredTransactions()

    return (
      <TransactionList 
        expandedIds={expandedTransactionIds}
        transactions={transactions} 
        title={title} 
        callbacks={callbacks}
      />
    )
  }
  
}

export default App;
