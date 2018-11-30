import React, { Component } from 'react';
import { fetchTransactions } from './state'

import 'bootstrap/dist/css/bootstrap.css'
import './App.css';

import TransactionList from './TransactionList'

class App extends Component {

  state = {
    title: 'My Bank Account',
    currency: '€', // &eur; !!!
    transactions: [],
    filterAmount: 20
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

  // isExpansive = (transaction) => {
  //   const isExpansive = transaction.amount > 50 // --> deve diventare "num"
  //   return isExpansive;
  // }

  // filterResults = (num) => {
  //   // come passo num? bind?
  //   const filteredTransactions = this.state.transactions.filter(this.isExpansive);
  //   this.setState({
  //     transactions: filteredTransactions
  //   })
  // }
  onSearch = (filterAmount) => {
    this.setState({
      filterAmount: filterAmount
    })
  }

  addTransaction = () => {
    const newTransaction = { id: Date.now(), amount: 400, title: 'Foo', descriptions: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt' }
    this.setState({
      transactions: [...this.state.transactions, newTransaction]
    })
  }

  getTransactionsToDisplay () {
    const { filterAmount, transactions } = this.state
    if (!filterAmount) {
      // Non c'e' nessun filtro settato, restituisco la lista completa
      return transactions
    }

    // l'utente sta filtrando, restutuisco solo le transazioni "expensive"
    return transactions.filter(transaction => transaction.amount > filterAmount)
  }

  render() {
    const { title, currency, filterAmount } = this.state
    // N.B.: transactions non viene piu' letto direttamente dallo stato
    const transactions = this.getTransactionsToDisplay()

    const callbacks = {
      onSearch: this.onSearch,
      onIncrementAmount: this.incrementAmount,
      onAddTransaction: this.addTransaction,
      onClearTransactions: this.clearTransactions
    }

    return (
      <TransactionList
        transactions={transactions}
        currency={currency}
        filterAmount={filterAmount}
        title={title}
        callbacks={callbacks}
      />
    )
  }

}

export default App;
