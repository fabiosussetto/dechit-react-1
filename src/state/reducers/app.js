import transactions from './transactions'
import filters from './filters'
//* importo il nuovo reducer
import card from './card'

const initialState = {
    transactions: {
        loading: true,
        list: []
    },
    filters: {
        amount: 0
    },
    //* creo il mio stato
    //* TODO correggere: sono riuscita a farlo solo aggiungendo "ids" non capisco come mai
    expandedTransactionIds: {
      ids: [ 1 ]
    },
}

export default function app(state = initialState, action) {
    return {
        transactions: transactions(state.transactions, action),
        filters: filters(state.filters, action),
        expandedTransactionIds: card(state.expandedTransactionIds, action),
    }
}
