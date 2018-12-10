export function getFilteredTransactions(state) {
    const transactions = state.transactions.list;
    const filterAmount = state.filters.amount;
    console.log(state);
    if (!filterAmount) {
        return transactions;
    }
    return transactions.filter(transaction => transaction.amount > filterAmount);
}