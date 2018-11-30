import React, { Component } from 'react';
import TransactionCard from './TransactionCard'
import TransactionFilter from './TransactionFilter'


class TransactionList extends Component {

  isCardExpanded = (transaction) => {
    const { expandedIds } = this.props
    return expandedIds.indexOf(transaction.id) > -1
  }

  render() {
    const { title, transactions, callbacks } = this.props
  
    const listElements = transactions.map((transaction) => (
      <TransactionCard 
        onToggleExpand={() => callbacks.toggleCardExpanded(transaction) }
        expanded={this.isCardExpanded(transaction)}
        transaction={transaction} 
        onIncrementAmount={callbacks.onIncrementAmount.bind(this, transaction.id)}
        key={transaction.id} 
      />
    ))

    return (
      <div className="container">
        <h1>{title}</h1>
        <div className="mb-2">
          <TransactionFilter onSubmit={callbacks.onFilterSubmit} />
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
