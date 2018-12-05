import axios from 'axios'

export function setFilterAmount (amount) {
    return { type: 'SET_FILTER_AMOUNT', amount: amount }
}

/// ????????

export function incrementAmount(transactionId) {

  const { transactions } = this.state

  const txIndex = transactions.findIndex((tx) => tx.id === transactionId)
  const txToUpdate = transactions[txIndex]

  const incrementedTx = { ...txToUpdate, amount: txToUpdate.amount + 10 }

  const newTransactions = [...transactions]
  newTransactions[txIndex] = incrementedTx

  this.setState({
    transactions: newTransactions
  })

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
