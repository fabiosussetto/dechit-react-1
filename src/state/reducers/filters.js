export default function filters(state, action) {
    switch (action.type) {
        case 'SET_FILTER_AMOUNT':
            return {
                ...state,
                amount: action.payload.amount
            }
        default:
            return state;
    }
}