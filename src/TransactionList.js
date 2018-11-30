import React, { Component } from 'react';
import TransactionCard from './TransactionCard'
import SearchBar from './SearchBar'

class TransactionList extends Component {

  render() {
    const { title, transactions, currency, filterAmount, callbacks } = this.props

    const listElements = transactions.map((transaction) => (
      <TransactionCard
        transaction={transaction}
        currency={currency}
        onIncrementAmount={callbacks.onIncrementAmount.bind(this, transaction.id)}
        key={transaction.id}
      />
    ))

    return (
      <div>
        <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
          <button className="navbar-brand btn btn-link">{title}</button>
          <ul className="navbar-nav mr-auto"> {/* empty, for now */}</ul>
          <SearchBar
            filterAmount={filterAmount}
            onSubmit={callbacks.onSearch}
          />
        </nav>
        <div className="container pt-2">
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
      </div>
    )
  }

}

export default TransactionList;
