import React, { Component } from 'react';
import { connect } from "react-redux";
import TransactionCard from './TransactionCard'
import TransactionFilter from './TransactionFilter'
import { incrementAmount, decrementAmount, removeTransacion, editTransaction } from './state/actions'
import { getVisibleTransactions } from './state/selectors'
// import PropTypes from 'prop-types';   // !!! NOTE: vedere propType per validare il tipo delle prop passate

class TransactionList extends Component {

  isCardExpanded = (transaction,expandedIds) => {
    //* indica se la transazione passata esiste o no nell'array di quelle espanse.
    // ritorna un boolean che mi serve come condizione nel componente della card
    const result = expandedIds.ids.indexOf(transaction.id) > -1;
    return result
  }

  onClearTransactions = () => {
    this.props.dispatch({
      type: 'REMOVE_ALL_TRANSACTIONS',
    })
  }

  onAddTransaction = () => {
    this.props.dispatch({
      type: 'ADD_TRANSACTION',
      payload: {
        amount: '10',
        description: 'Woooha!',
      }
    })
  }

  incrementAmount = (transactionId) => {
    this.props.dispatch(incrementAmount(transactionId))
  }

  decrementAmount = (transactionId) => {
    this.props.dispatch(decrementAmount(transactionId))
  }

  editTransaction = (transactionId) => {
    this.props.dispatch(editTransaction(transactionId))
  }

  removeTransacion = (transactionId) => {
    this.props.dispatch(removeTransacion(transactionId))
  }

  render() {
    //* uso le props prese dallo stato generale e mappate con mapStateToProps
    const { transactions, callbacks, loading, expandedTransactionIds, currency } = this.props

    //* se loading è true, ritorno solo il loader stoppando così l'esecuzione
    if (loading) {
      return (
        <div className="d-flex justify-content-center align-items-center"
             style={{ minHeight: 60 }}>
          Loading...
        </div>
      )
    }

    //* Se voglio cambiare il titolo della transazione con il nome della lista titoli
    // e non col valore come è scritto nel json, devo mappare le mie transazioni
    const transactionsTransformed = transactions.map(function(transaction) {
      // finto array  sostituire con le categorie da api
      const catsObjs = [ {
              name: "Books",
              value: "books"
              }, {
              name: "Cat food",
              value: "cat"
              }, {
              name: "Home",
              value: "home"
              }, {
              name: "Grocery",
              value: "grocery"
            } ]

       //* filtro solo il titolo corrente
       let curObj = catsObjs.filter(item => item.value === transaction.category)
       //* fallback se non ci sono risultati in filter
       curObj = (curObj.length > 0) ? curObj : [{
                                                 name: "Unknown",
                                                 value: "unknown"
                                               }]
       //* estraggo il primo (e unico) elemento
       const current = curObj.shift();

       //* applico il risultato alla transaction corrente,
       // creando la property "label, prima inesistente
       return transaction = {
         ...transaction,
         category: current.value,
         label: current.name
       }

    } )

    //* passo alla mia funzione isCardExpanded() sia la transazione corrente
    // che l array delle transazioni espanse da controllare
    const listElements = transactionsTransformed.map((transaction) => (
        <TransactionCard
          onToggleExpand={() => callbacks.toggleCardExpanded(transaction) }
          expanded={this.isCardExpanded(transaction,expandedTransactionIds)}
          transaction={transaction}
          currency={currency}
          onEditTransaction={this.editTransaction.bind(this, transaction.id)}
          onDecrementAmount={this.decrementAmount.bind(this, transaction.id)}
          onIncrementAmount={this.incrementAmount.bind(this, transaction.id)}
          onRemoveTransacion={this.removeTransacion.bind(this, transaction.id)}
          key={transaction.id}
        />
    ))

    return (
      <React.Fragment>
        <TransactionFilter />
        {listElements}
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
      </React.Fragment>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    transactions: getVisibleTransactions(state),
    currency: state.currency,
    loading: state.transactions.loading,
    //* mappo nelle props anche le transazioni espanse per usarle con this.props
    expandedTransactionIds: state.expandedTransactionIds,
    //* mappo i titoli
    categories: state.categories
  }
}

export default connect(mapStateToProps)(TransactionList);
