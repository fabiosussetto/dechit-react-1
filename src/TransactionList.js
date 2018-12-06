import React, { Component } from 'react';
import { connect } from "react-redux";
import TransactionCard from './TransactionCard'
import TransactionFilter from './TransactionFilter'

import { fetchTransactions, incrementAmount } from './state/actions'

import { getFilteredTransactions } from './state/selectors'


class TransactionList extends Component {

  isCardExpanded = (transaction,expandedIds) => {
    //* indica se la transazione passata esiste o no nell'array di quelle espanse.
    //* ritorna un boolean che mi serve come condizione nel componente della card
    const result = expandedIds.ids.indexOf(transaction.id) > -1;
    return result
  }

  componentDidMount () {
    this.props.dispatch(fetchTransactions())
  }

  //* spostata da App
  onClearTransactions = () => {
    this.props.dispatch({
      type: 'REMOVE_ALL_TRANSACTION',
      payload: { amount: 400, title: 'asdasd' }
    })
  }

  //* spostata da App
  incrementAmount = (transactionId) => {
    this.props.dispatch(incrementAmount(transactionId))
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

    const listElements = transactions.map((transaction) => (
      <TransactionCard
        onToggleExpand={() => callbacks.toggleCardExpanded(transaction) }
        //* passo alla mia funzione isCardExpanded() sia la transazione corrente
        //* che l'array delle transazioni espanse da controllare
        expanded={this.isCardExpanded(transaction,expandedTransactionIds)}
        transaction={transaction}
        currency={currency}
        onIncrementAmount={this.incrementAmount.bind(this, transaction.id)}
        key={transaction.id}
      />
    ))

    return (
      <div>
        <TransactionFilter />
        <div>
          {listElements}
        </div>
        <button className="btn btn-secondary" onClick={this.onClearTransactions}>
          Remove all
        </button>
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
