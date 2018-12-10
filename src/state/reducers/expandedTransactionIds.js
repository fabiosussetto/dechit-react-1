export default function expandedTransactionIds(state, action) {
    switch(action.type) {
        case 'TOGGLE_CARD_EXPANDED':
            return {
                ...state,
                listIds: action.payload.listIds
            }
        default:
            return state;
    }
}