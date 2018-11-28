import React, { Component } from 'react';
import TransactionCard from './TransactionCard'

class TransactionList extends Component {

  render() {
    const { title, transactions, callbacks, filterAmount } = this.props
    const handleChange = callbacks.onHandleChange.bind(this)
    
    const listElements = transactions
    .filter((transaction) => (transaction.amount > filterAmount))
    .map((transaction) => (
      <TransactionCard transaction={transaction} onIncrementAmount={callbacks.onIncrementAmount.bind(this, transaction.id)} key={transaction.id} />
    ))

    return (
      <div className="container">
        <h1>{title}</h1>
        <div className="row mt-3">
          <div className="col-12">
            <h5 className="text-info float-left">Filtered transactions for amounts greater than</h5>&nbsp;<input type="number" value={filterAmount} onChange={handleChange} /> &euro;
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {listElements}
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <button className="btn btn-primary" onClick={callbacks.onAddTransaction}>
              Add
            </button>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
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