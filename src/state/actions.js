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
