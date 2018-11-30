import transactions from './transactions'
import filters from './filters'

const initialState = {
    transactions: {
        loading: true,
        list: [
            // { id: 1, amount: 20, title: 'Test transaction' },
            // { id: 2, amount: 50, title: 'Another one' }
        ]
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