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
        case 'ADD_TRANSACTION_FROM_FORM':
            return {
                ...state,
                list: action.payload.list
            }
        case 'CLEAR_TRANSACTIONS':
            return {
                ...state,
                list: action.payload.list
            }
        case 'INCREMENT_AMOUNT':
            return {
                ...state,
                list: action.payload.list
            }
        case 'REMOVE_TRANSACTION':
            return {
                ...state,
                list: action.payload.list
            }
        default:
            return state;
    }
}