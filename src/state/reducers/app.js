import transactions from './transactions'
import filters from './filters'
import transaction_titles_list from './addform'
//* importo il nuovo reducer
import card from './card'

const initialState = {
    currency: "€",
    transaction_titles: {
      list: [ ]
    },
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
      ids: [ 5 ]
    },
}

export default function app(state = initialState, action) {
    return {
        currency: state.currency,
        transaction_titles: transaction_titles_list(state.transaction_titles, action),
        transactions: transactions(state.transactions, action),
        filters: filters(state.filters, action),
        expandedTransactionIds: card(state.expandedTransactionIds, action),
    }
}
