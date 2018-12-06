import axios from 'axios'

export function setFilterAmount (amount) {
    return { type: 'SET_FILTER_AMOUNT', amount: amount }
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
          })
  };
}

//* esporto la mia funzione nelle actions, poi ne faccio il dispatch per passarla
//* già "pulita" al reducer (meglio lasciare il reducwer più pulito possibile)
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

export function fetchTitles() {
  return (dispatch, getState) => {
      axios.get('http://www.martapetrella.com/dechit-corso-titles.json')
          .then((resp) => {
              dispatch({
                  type: 'SET_TRANSACTION_TITLES_LIST',
                  titles: resp.data
              });
          })
  };
}

export function toggleCard(transaction) {
  return (dispatch, getstate) => {
    //* passo i parametri al reducer
    dispatch({
      type: 'TOGGLE_CARD',
      payload: {transaction: transaction}
    });
  }
}
