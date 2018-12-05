export default function card(state, action) {

  //* nel nuovo reducer, richiamo l'azione TOGGLE_CARD e ci metto dentro ciò che
  //* prima veniva gestito nella funzione nel componente di react

    switch (action.type) {
        case 'TOGGLE_CARD':
        //* creo la costante degli oggetti passati dal payload
        const {transaction} = action.payload
        //* recupero lo stato
        const expandedTransactionIds = state.ids
        //* vedo se l'id della transazione è presente nelle transazioni espanse e ne recupero l'indice
        const index = expandedTransactionIds.indexOf(transaction.id)
        //* setto la variabile che ospiterà la copia del mio stato
        var newState = state.ids

        if (index === -1) {
          //* se l'indice non esiste è -1, quindi lo aggiungo
          const newObjId = transaction.id
          newState = [...state.ids, newObjId]
        } else {
          //* se l'indice esiste lo sottraggo con splice
          newState.splice(index, 1)
        }
        //* setto il nuovo stato
        return {
            ...state,
            ids: newState
        }
        default:
            return state;
    }
}
