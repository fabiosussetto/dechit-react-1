import React, { Component } from 'react';
import TransactionCard from './TransactionCard'

class TransactionList extends Component {

  render() {
    const { title, transactions, callbacks } = this.props

    callbacks.onAmountSearchChange.bind(this,amountFilter)

  
    const listElements = transactions.map((transaction) => (
      <TransactionCard 
        transaction={transaction} 
        onIncrementAmount={callbacks.onIncrementAmount.bind(this, transaction.id)}
        key={transaction.id} onExpand={callbacks.onExpand.bind(this,transaction.id)}
      />
    ))

    return (
      <div className="container">
        <h1>{title}</h1>
        <div className="form-group">
          <label htmlFor="filterAmount">Filter Amount</label>
          <input type="search" className="form-control" id="filterAmount" />
        </div>
        <div>
          {listElements}
        </div>
        <div className="btn-group">
          <button className="btn btn-primary" onClick={callbacks.onAddTransaction}>
            Add
          </button>
          <button className="btn btn-secondary" onClick={callbacks.onClearTransactions}>
            Remove all
          </button>
        </div>
      </div>
    )
  }
  
}

export default TransactionList;
