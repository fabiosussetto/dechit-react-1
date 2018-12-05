export default function card(state, action) {
    switch (action.type) {
        case 'TOGGLE_CARD':

        const {transaction} = action

        const expandedTransactionIds = state.ids
        const index = expandedTransactionIds.indexOf(transaction.id)
        var newState = state.ids

        if (index === -1) {
          const newObjId = transaction.id
          newState = [...state.ids, newObjId]
        } else {
          const updatedIds = [...expandedTransactionIds]
          newState.splice(index, 1)
        }

        console.log('State Ids',state.ids,'Current',transaction.id,'newState',newState);

        return {
            ...state,
            ids: newState
        }

        default:
            return state;
    }
}
