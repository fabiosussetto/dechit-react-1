import React, { Component } from 'react';
import {fetchTransaction} from './state';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import TransactionList from './TransactionList';

class App extends Component {

  state = {
    title : 'My Bank Account',
    transactions: [],
    filterAmount: 0
  }

  fetchData = () => {
    fetchTransaction()
      .then((resp) => {
        this.setState({
          transactions: resp.data
        })
      })
  }

  // questa funzione viene richiamata automaticamente quando viene montato un nuovo componente nel DOM
  componentWillMount () {
    this.fetchData()
  }

  clearTransactions = () => {
    this.setState({
      transactions: [],
      filterAmount: 0
    })
  }

  updateTitle = () => {
    this.setState({
      title: `Update title ${Date.now()}`
    })
  }

  incrementAmount = (transactionId) => {
    // aggiorno solo il primo oggetto dell'array
    /*const currentFirstTx = this.state.transactions[0];
    const incrementedTx = {...currentFirstTx, amount: currentFirstTx.amount + 10};
    this.setState({
      transactions: [incrementedTx, ...this.state.transactions.slice(1)]
    })*/

    const {transactions} = this.state
    const txIndex = transactions.findIndex(tx => tx.id === transactionId);
    const txtoUpdate = transactions[txIndex]
    const incrementedTx = {...txtoUpdate, amount: txtoUpdate.amount + 10};
    const newTransaction = [...transactions];
    newTransaction[txIndex] = incrementedTx;

    this.setState({
      transactions: newTransaction
    })
  }

  addTransaction = () => {
    // modifica lo stato corrente, meglio non usarlo
    /*const currentTransaction = this.state.transactions
    currentTransaction.push({id: Date.now(), amount: 400, title: 'blablabla'})
    this.setState({
      transactions: currentTransaction
    })*/
    
    // soluzione corretta! creiamo una copia dell'array
    // l'array non contiene copia di tutti gli elementi, ma dei puntatori all'array originale
    // quindi creiamo una copia dell'array che contiene puntatori agli elementi e non una copia degli elementi stessi
    const newTransaction = {id: Date.now(), amount: 400, title: 'blablabla'}
    this.setState({ // serve per non modificare direttamente lo stato corrente
      transactions: [...this.state.transactions, newTransaction]
    })
  }

  handleChange = (event) => {
    this.setState({
      filterAmount: event.target.value
    })
  }

  render() {
    const { title, transactions, filterAmount } = this.state
    const callbacks = {
      onIncrementAmount: this.incrementAmount,
      onAddTransaction: this.addTransaction,
      onClearTransactions: this.clearTransactions,
      onHandleChange: this.handleChange
    }

    return (
      <TransactionList transactions={transactions} title={title} callbacks={callbacks} filterAmount={filterAmount} />
    )
  }
  
}

export default App;