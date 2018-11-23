import React, { Component } from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';

import TransactionCard from './TransactionCard'


class App extends Component {

  state = {
    title: 'My Bank Account',
    transactions: []    
  }

  fetchData = () => {
    axios.get('https://my.api.mockaroo.com/transactions?key=f02d0440')
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
  
    const listElements = transactions.map((transaction) => (
      <TransactionCard 
        transaction={transaction} 
        onIncrementAmount={this.incrementAmount.bind(this, transaction.id)}
        key={transaction.id} 
      />
    ))

    return (
      <div className="container">
        <h1>{title}</h1>
        <div>
          {listElements}
        </div>
        <div className="btn-group">
          <button className="btn btn-primary" onClick={this.addTransaction}>
            Add
          </button>
          <button className="btn btn-secondary" onClick={this.clearTransactions}>
            Remove all
          </button>
          <button className="btn btn-secondary" onClick={this.addTransaction}>
            Update title
          </button>
        </div>
      </div>
    )
  }
  
}

export default App;
