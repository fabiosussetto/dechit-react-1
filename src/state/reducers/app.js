import transactions from './transactions'
import filters from './filters'

const initialState = {
    transactions: {
        loading: true,
        list: []
    },
    filters: {
        amount: 0
    }
}

export default function app(state = initialState, action) {
    return {
        transactions: transactions(state.transactions, action),
        filters: filters(state.filters, action),
    }
}