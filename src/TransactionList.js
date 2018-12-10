import React, { Component } from 'react';
import { connect } from "react-redux";
import TransactionCard from './TransactionCard'
import * as actions from './state/actions'

import { getFilteredTransactions } from './state/selectors'


class TransactionList extends Component {

  isCardExpanded = (transaction) => {
    const { expandedIds } = this.props
    return expandedIds.indexOf(transaction.id) > -1
  }

  componentDidMount () {
    this.props.dispatch(actions.fetchTransactions())
  }

  onAdd = () => {
    this.props.dispatch(actions.addTransaction())
  }

  render() {
    const { transactions, callbacks, loading } = this.props

    if (loading) {
      return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 60 }}>
          Loading...
        </div>
      )
    }
  
    const listElements = transactions.map((transaction) => (
      <TransactionCard 
        onToggleExpand={() => callbacks.toggleCardExpanded(transaction) }
        expanded={this.isCardExpanded(transaction)}
        transaction={transaction} 
        onRemoveTransaction={callbacks.onRemoveTransaction.bind(this, transaction.id)}
        onIncrementAmount={callbacks.onIncrementAmount.bind(this, transaction.id)}
        key={transaction.id} 
      />
    ))

    return (
      <div>
        <div>
          {listElements}
        </div>
        <div className="btn-group">
          <button className="btn btn-primary" onClick={this.onAdd}>
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

const mapStateToProps = (state) => {
  return {
    transactions: getFilteredTransactions(state),
    loading: state.transactions.loading
  }
}

export default connect(mapStateToProps)(TransactionList);