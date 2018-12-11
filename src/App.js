import React, { Component } from 'react';
import { connect } from "react-redux";
import TransactionFilter from './TransactionFilter'

import 'bootstrap/dist/css/bootstrap.css'
import './App.css';

import TransactionList from './TransactionList'
import * as actions from './state/actions'
import {getFilteredTransactions} from './state/selectors'

import {BrowserRouter as Router, Route} from 'react-router-dom';
import Menu from './Menu';
import AddTransaction from './AddTransaction';

class App extends Component {
  componentDidMount() {
      this.props.dispatch(actions.fetchTransactions())
  }

  toggleCardExpanded = (transaction) => {
    const {expandedTransactionIds} = this.props
    const index = expandedTransactionIds.indexOf(transaction.id)

    if(index === -1) {
      const newExpandedTransactionIds = [...expandedTransactionIds, transaction.id]
      this.props.dispatch(actions.expandedTransactionIds(newExpandedTransactionIds))
     
      return
    }

    const updatedIds = [...expandedTransactionIds]
    updatedIds.splice(index, 1)

    this.props.dispatch(actions.expandedTransactionIds(updatedIds))
  }

  allToggleCardExpanded = () => {
    const {transactions, expandedTransactionIds} = this.props
    
    if(expandedTransactionIds.length < transactions.length) {
      const transactionsIds = transactions.map(transaction => transaction.id)
      this.props.dispatch(actions.expandedTransactionIds(transactionsIds))

      return
    }
    
    const removeTransactionsIds = []
    this.props.dispatch(actions.expandedTransactionIds(removeTransactionsIds))
  }

  clearTransactions = () => {
    this.props.dispatch(actions.clearTransactions());
  }

  incrementAmount = (transactionId) => {
    const { transactions } = this.props
    
    const txIndex = transactions.findIndex((tx) => tx.id === transactionId)
    const txToUpdate = transactions[txIndex]
    const incrementedTx = { ...txToUpdate, amount: txToUpdate.amount + 10 }
    const newTransactions = [...transactions]
    newTransactions[txIndex] = incrementedTx
    this.props.dispatch(actions.incrementAmount(newTransactions));
  }

  removeTransaction = (transactionId) => {
    const { transactions } = this.props
    const newTransactions = transactions.filter(transaction => transaction.id!==transactionId);
    this.props.dispatch(actions.removeTransaction(newTransactions));
  }

  render() {
    const { transactions, expandedTransactionIds } = this.props

    const callbacks = {
      onIncrementAmount: this.incrementAmount,
      onRemoveTransaction: this.removeTransaction,
      onClearTransactions: this.clearTransactions,
      toggleCardExpanded: this.toggleCardExpanded,
      allToggleCardExpanded: this.allToggleCardExpanded
    }

    return (
      <Router>
        <div>
          <Menu />
          <div className="container">
            <Route exact path="/" render={() => <TransactionFilter callbacks={callbacks} expandedIds={expandedTransactionIds} transactions={transactions} />}></Route>
            <Route exact path="/" render={() => <TransactionList expandedIds={expandedTransactionIds} callbacks={callbacks} />}></Route>
            <Route path="/addTransaction" component={AddTransaction} />
          </div>
        </div>
      </Router>
    )
  }  
}

const mapStateToProps = (state) => {
  return {
    transactions: getFilteredTransactions(state),
    expandedTransactionIds: state.expandedTransactionIds.listIds
  }
}

const ConnectedApp = connect(mapStateToProps)(App)

export default ConnectedApp