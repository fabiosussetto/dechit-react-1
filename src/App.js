import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';

import TransactionCard from './TransactionCard'


class App extends Component {

  state = {
    transactions: [
      {
        id: 1,
        title: 'pay rent',
        amount: 100
      },
      {
        id: 2,
        title: 'holidays',
        amount: 250
      },
      {
        id: 3,
        title: 'groceries',
        amount: 10
      }
    ]    
  }

  clearTransactions = () => {
    this.setState({
      transactions: []
    })
  }

  // addTransactions = () => {
  //   this.setState({
  //     transactions: this.state.transactions.push({...})
  //   })
  // }

  render() {
  
    const listElements = this.state.transactions.map((transaction) => (
      <TransactionCard transaction={transaction} key={transaction.id} />
    ))

    return (
      <div>
        <h1>{this.state.title}</h1>
        <div>
          {listElements}
        </div>
        <button className="btn btn-secondary" onClick={this.clearTransactions}>
          Remove all
        </button>
      </div>
    )
  }
  
}

export default App;
