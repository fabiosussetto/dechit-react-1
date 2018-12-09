import axios from 'axios'

export function setFilterAmount (amount) {
    return { 
        type: 'SET_FILTER_AMOUNT', 
        payload: {
            amount: amount
        }
    }
}

export function fetchTransactions() {
    return (dispatch, getState) => {
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

export function addTransaction() {
    return { 
        type: 'ADD_TRANSACTION', 
        payload: { 
            amount: 400, 
            title: 'asdasd',
            descriptions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent blandit dolor quis lectus feugiat, a eleifend dui varius. Duis est neque, egestas pellentesque iaculis nec, accumsan non nunc. Curabitur eget egestas tellus, quis sodales nisl. Nullam egestas ut dui vel iaculis. Quisque vel odio pellentesque, tincidunt nulla non, mollis erat. Morbi ornare libero ante. Integer suscipit varius nibh, eget viverra lacus posuere et. Fusce sed ante magna. Etiam ullamcorper pretium lacinia.'
        } 
    }
}

export function clearTransactions() {
    return {
        type: 'CLEAR_TRANSACTIONS', 
        payload: { 
            list: [] 
        }
      }
}

export function incrementAmount(newTransactions) {
    return {
        type: 'INCREMENT_AMOUNT',
        payload: {
            list: [...newTransactions]
        }        
    }
}

export function removeTransaction(newTransactions) {
    return {
        type: 'REMOVE_TRANSACTION',
        payload: {
            list: [...newTransactions]
        }
    }
}