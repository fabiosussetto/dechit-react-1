import React, { Component } from 'react';
import { connect } from "react-redux";
import TransactionCard from './TransactionCard'
import { fetchTransactions } from './state/actions'

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

  onAdd = () => {
    this.props.dispatch({
      type: 'ADD_TRANSACTION',
      payload: { amount: 400, title: 'asdasd' }
    })
  }

  render() {
    //* uso le props mappatecon mapStateToProps
    const { transactions, callbacks, loading, expandedTransactionIds } = this.props
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
    loading: state.transactions.loading,
    //* mappo nelle props anche le transazioni espanse per usarle con this.props
    expandedTransactionIds: state.expandedTransactionIds
  }
}

export default connect(mapStateToProps)(TransactionList);
