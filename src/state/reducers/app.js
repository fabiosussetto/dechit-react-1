import transactions from './transactions'
import filters from './filters'
import categories from './categories'
//* importo il nuovo reducer
import card from './card'

//* !!! NOTE: vedere REDUX LOCAL STORAGE per salvare
// lo stato dello store all'interno dello stato del browser:
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
        amount: 0,
        sortBy: 'id',
        sortDir: 'ASC'
    },
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
