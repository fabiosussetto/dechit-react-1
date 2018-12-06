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

          const transactions = state.list

          const txIndex = transactions.findIndex((tx) => tx.id === action.payload.transactionId)
          const txToUpdate = transactions[txIndex]

          const incrementedTx = { ...txToUpdate, amount: txToUpdate.amount + 10 }

          const newTransactions = [...transactions]
          newTransactions[txIndex] = incrementedTx

        return {
          ...state,
          list: newTransactions
        }
        default:
            return state;
    }
}
