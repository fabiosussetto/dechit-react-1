import transactions from './transactions'
import filters from './filters'
import expandedTransactionIds from './expandedTransactionIds'

const initialState = {
    transactions: {
        loading: true,
        list: []
    },
    filters: {
        amount: 0
    },
    expandedTransactionIds: {
        listIds: []
    }
}

export default function app(state = initialState, action) {
    return {
        transactions: transactions(state.transactions, action),
        filters: filters(state.filters, action),
        expandedTransactionIds: expandedTransactionIds(state.expandedTransactionIds, action),
    }
}