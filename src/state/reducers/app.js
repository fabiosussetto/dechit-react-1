import transactions from './transactions'
import filters from './filters'
import categories from './categories'
import jobs from './jobs'
//* importo il nuovo reducer
import card from './card'

const initialState = {
    currency: "€",
    categories: {
      loading: true,
      list: []
    },
    jobs: {
      loading: true,
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
        jobs: jobs(state.jobs, action),
        transactions: transactions(state.transactions, action),
        filters: filters(state.filters, action),
        expandedTransactionIds: card(state.expandedTransactionIds, action),
    }
}
