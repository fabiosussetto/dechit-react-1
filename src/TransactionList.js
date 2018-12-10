import React, { Component } from 'react';
import { connect } from "react-redux";
import TransactionCard from './TransactionCard'
import TransactionFilter from './TransactionFilter'

import { incrementAmount, removeTransacion } from './state/actions'

import { getFilteredTransactions } from './state/selectors'


class TransactionList extends Component {

  isCardExpanded = (transaction,expandedIds) => {
    //* indica se la transazione passata esiste o no nell'array di quelle espanse.
    // ritorna un boolean che mi serve come condizione nel componente della card
    const result = expandedIds.ids.indexOf(transaction.id) > -1;
    return result
  }

  //* spostata da App
  onClearTransactions = () => {
    this.props.dispatch({
      type: 'REMOVE_ALL_TRANSACTIONS',
      payload: { amount: 400, title: 'asdasd' }
    })
  }

  onAddTransaction = () => {
    this.props.dispatch({
      type: 'ADD_TRANSACTION',
      payload: {
        amount: '10',
        title: 'Default',
        descriptions: 'Woooha!',
      }
    })
  }

  //* spostata da App
  incrementAmount = (transactionId) => {
    this.props.dispatch(incrementAmount(transactionId))
  }

  removeTransacion = (transactionId) => {
    this.props.dispatch(removeTransacion(transactionId))
  }

  render() {
    //* uso le props mappate con mapStateToProps
    const { transactions, callbacks, loading, expandedTransactionIds, currency } = this.props

    if (loading) {
      return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 60 }}>
          Loading...
        </div>
      )
    }

    //* passo alla mia funzione isCardExpanded() sia la transazione corrente
    // che l array delle transazioni espanse da controllare
    const listElements = transactions.map((transaction) => (
      <TransactionCard
        onToggleExpand={() => callbacks.toggleCardExpanded(transaction) }
        expanded={this.isCardExpanded(transaction,expandedTransactionIds)}
        transaction={transaction}
        currency={currency}
        onIncrementAmount={this.incrementAmount.bind(this, transaction.id)}
        onRemoveTransacion={this.removeTransacion.bind(this, transaction.id)}
        key={transaction.id}
      />
    ))

    return (
      <div>
        <TransactionFilter />
        <div>
          {listElements}
        </div>
        {transactions.length > 0 && (
          <button className="btn btn-danger btn-sm float-right" onClick={this.onClearTransactions}>
            Remove all
          </button>
        )}
        {transactions.length === 0 && (
          <button className="btn btn-success btn-sm float-right" onClick={this.onAddTransaction}>
            Add Default
          </button>
        )}
      </div>
    )
  }

}


const mapStateToProps = (state) => {
  return {
    transactions: getFilteredTransactions(state),
    currency: state.currency,
    loading: state.transactions.loading,
    //* mappo nelle props anche le transazioni espanse per usarle con this.props
    expandedTransactionIds: state.expandedTransactionIds
  }
}

export default connect(mapStateToProps)(TransactionList);
