export default function transactions(state, action) {
    switch (action.type) {
        case 'SET_TRANSACTIONS':
            return {
                ...state,
                loading: false,
                list:  action.payload.list
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
        default:
            return state;
    }
}
