import axios from 'axios'

const url = 'http://www.martapetrella.com/';

export function setFilterAmount (amount) {
    return { type: 'SET_FILTER_AMOUNT', amount: amount }
}

export function setSortOrder (sortBy,sortDir) {
    return { type: 'SET_SORT_ORDER',
             payload: {
               sortBy: sortBy,
               sortDir: sortDir
             }
           }
}

export function setLoading(status) {
    return { type: 'SET_LOADING', status: status }
}

export function fetchTransactions() {
  const apiUrl = url+'dechit-corso.json';
  return (dispatch, getState) => {
    axios.get(apiUrl).then((resp) => {
              dispatch({
                  type: 'SET_TRANSACTIONS',
                  payload: {
                      list: resp.data
                  }
              });
          }, error => {
            dispatch({
                type: 'SET_TRANSACTIONS',
                payload: {
                    list: []
                }
            });
          })
  };
}

export function setTransactions(transactions) {
    return {
      type: 'SET_TRANSACTIONS',
      payload: {
          list: transactions
      }
    }
}

//* esporto la mia funzione nelle actions, poi ne faccio il dispatch per passarla
// già "pulita" al reducer (meglio lasciare il reducwer più pulito possibile)
export function incrementAmount(transactionId) {
  return (dispatch, getState) => {
    const state = getState()
    const transactions = state.transactions.list

    const txIndex = transactions.findIndex((tx) => tx.id === transactionId)
    const txToUpdate = transactions[txIndex]

    const incrementedTx = { ...txToUpdate, amount: txToUpdate.amount + 10 }

    const newTransactions = [...transactions]
    newTransactions[txIndex] = incrementedTx

    dispatch({
        type: 'EDIT_TRANSACTION',
        transactions: newTransactions
    });
  };
}

export function decrementAmount(transactionId) {
  return (dispatch, getState) => {
    const state = getState()
    const transactions = state.transactions.list

    const txIndex = transactions.findIndex((tx) => tx.id === transactionId)
    const txToUpdate = transactions[txIndex]

    const newAmount = txToUpdate.amount > 10 ? txToUpdate.amount - 10 : txToUpdate.amount
    const incrementedTx = { ...txToUpdate, amount: newAmount }

    const newTransactions = [...transactions]
    newTransactions[txIndex] = incrementedTx

    dispatch({
        type: 'EDIT_TRANSACTION',
        transactions: newTransactions
    });
  };
}

export function editTransaction(transactionId,submittedForm) {
  return (dispatch, getState) => {
    const state = getState()
    // recupero le transazioni
    const transactions = state.transactions.list
    // cerco quella con l'id che mi interessa
    const txIndex = transactions.findIndex((tx) => tx.id === transactionId)
    // la salvo in una variabile
    const txToUpdate = transactions[txIndex]

    const incrementedTx = {
      ...txToUpdate,
      category: submittedForm.category,
      amount: submittedForm.amount,
      description: submittedForm.description
    }

    const newTransactions = [...transactions]
    newTransactions[txIndex] = incrementedTx

    dispatch({
        type: 'EDIT_TRANSACTION',
        transactions: newTransactions
    });
  };
}

export function removeTransacion(transactionId) {
  return (dispatch, getState) => {
    const state = getState()
    const transactions = state.transactions.list
    const newTransactions = transactions.filter(transaction => transaction.id!==transactionId);
    dispatch({
      type: 'SET_TRANSACTIONS',
      payload: {
          list: newTransactions
      }
    });
  };
}

export function fetchCategoriesList() {
  const apiUrl = url+'dechit-corso-categories.json';
  return (dispatch, getState) => {
    axios.get(apiUrl).then((resp) => {
              dispatch({
                  type: 'SET_CATEGORIES_LIST',
                  categories: resp.data
              });
          }, error => {
              dispatch({
                  type: 'SET_CATEGORIES_LIST',
                  categories: [{title: "Default", value: "default"}]
              });
          })
  };
}

export function fetchJobsList() {
  const apiUrl = 'http://www.stagingarea.it/dechit/wp-json/wp/v2/posts';
  return (dispatch, getState) => {
    axios.get(apiUrl).then((resp) => {
              dispatch({
                  type: 'SET_JOBS_LIST',
                  jobs: resp.data
              });
              console.log('fetchJobsList done');
          }, error => {
              dispatch({
                  type: 'SET_JOBS_LIST',
                  jobs: {error:'ERROR'}
              });
              console.log('fetchJobsList error');
          })
  };
}

export function addNewTransaction(state) {
  return {
    type: 'ADD_TRANSACTION',
    payload: {
      amount: state.amount,
      category: state.category,
      description: state.description,
    }
  }
}
