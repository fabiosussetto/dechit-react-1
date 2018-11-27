import React, { Component } from 'react';
import TransactionCard from './TransactionCard'
import SearchBar from './SearchBar'

class TransactionList extends Component {

  render() {
    const { title, transactions, callbacks } = this.props

    const listElements = transactions.map((transaction) => (
      <TransactionCard
        transaction={transaction}
        onIncrementAmount={callbacks.onIncrementAmount.bind(this, transaction.id)}
        key={transaction.id}
      />
    ))

    return (
      <div className="container">
        <h1>{title}</h1>
        <SearchBar
          filterResults={callbacks.filterResults} />
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
