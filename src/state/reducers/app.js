import transactions from './transactions'
import filters from './filters'
import categories from './categories'
//* importo il nuovo reducer
import card from './card'

const initialState = {
    currency: "€",
    categories: {
      list: []
    },
    transactions: {
        loading: true,
        list: []
    },
    filters: {
        amount: 0
    },
    //* creo il mio stato
    //* ??? TODO correggere: sono riuscita a farlo solo aggiungendo "ids" non capisco come mai
    expandedTransactionIds: {
      ids: []
    },
}

export default function app(state = initialState, action) {
    return {
        currency: state.currency,
        categories: categories(state.categories, action),
        transactions: transactions(state.transactions, action),
        filters: filters(state.filters, action),
        expandedTransactionIds: card(state.expandedTransactionIds, action),
    }
}
