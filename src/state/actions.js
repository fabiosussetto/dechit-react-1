import axios from 'axios'

export function setFilterAmount (amount) {
    return { type: 'SET_FILTER_AMOUNT', amount: amount }
}

export function setLoading(status) {
    return { type: 'SET_LOADING', status: status }
}

export function fetchTransactions() {
  return (dispatch, getState) => {
    //axios.get('https://my.api.mockaroo.com/transactions?key=f02d0440')
    axios.get('http://www.martapetrella.com/dechit-corso.json')
          .then((resp) => {
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
        type: 'INCREMENT_AMOUNT',
        transactions: newTransactions
    });
  };
}

//* ??? chiedere se è più corretto usare un'azione "generica" tipo SET_TRANSACTIONS
//  oppure se è meglio crearne una ad hoc che però aggiorni i dati nello stemmo modo.
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

export function fetchTitlesList() {
  return (dispatch, getState) => {
      axios.get('http://www.martapetrella.com/dechit-corso-titles.json')
          .then((resp) => {
            console.log( resp.data );
              dispatch({
                  type: 'SET_TYPES_LIST',
                  titles: resp.data
              });
          }, error => {
              dispatch({
                  type: 'SET_TYPES_LIST',
                  titles: [{title: "Default", value: "default"}]
              });
          })
  };
}
