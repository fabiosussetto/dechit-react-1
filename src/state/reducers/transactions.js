export default function transactions(state, action) {
    switch (action.type) {
        case 'SET_TRANSACTIONS':
            return {
                ...state,
                loading: false,
                list:  action.payload.list
            }

        case 'SET_LOADING':
            const loadingStatus = action.status
            return {
                ...state,
                loading: loadingStatus,
            }
        case 'APPEND_TRANSACTIONS':
            return {
                ...state,
                list:  [...state.list, ...action.payload.list]
            }
        case 'ADD_TRANSACTION':
            const newTransaction = { id: Date.now(), ...action.payload }
            return {
                ...state,
                list: [...state.list, newTransaction]
            }
        case 'INCREMENT_AMOUNT':
          const incrementedTransaction = action.transactions
          return {
            ...state,
            list: incrementedTransaction
          }
        case 'REMOVE_ALL_TRANSACTIONS':
          return {
            ...state,
            list: []
          }
        case 'UPDATE_TRANSACTIONS_LIST':
          return {
            ...state,
            list: action.list
          }
        default:
            return state;
    }
}
