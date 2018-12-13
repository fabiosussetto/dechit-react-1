
export function getVisibleTransactions(state) {
    const transactions = state.transactions.list
    let newTransactions = transactions
    const filterAmount = state.filters.amount
    const sorter = state.filters.sortBy
    let filteredState = state
    newTransactions = getSortedTransactions(filteredState);
    filteredState.transactions.list = newTransactions
    newTransactions = getFilteredTransactions(filteredState);
    return newTransactions
}

export function getFilteredTransactions(state) {
    const transactions = state.transactions.list
    const filterAmount = state.filters.amount
    if (!filterAmount) {
        return transactions
    }
    return transactions.filter(transaction => transaction.amount > filterAmount).sort()
}

export function getSortedTransactions(state) {
    const transactions = state.transactions.list
    const sorter = state.filters.sortBy
    let compareFunction
    // l'array temporaneo contiene oggetti con posizione e valore di ordinamento
    var mapped = transactions.map((el)=> {
      return { index: el.amount, value: el };
    })
    // sorting tramite le compareFunctions
    switch(sorter) {
      case 'DESC':
        compareFunction = function(a,b) {
          if (a.index > b.index) return -1;
          if (a.index < b.index) return 1;
          return 0;
        }
      break;
      default:
        compareFunction = function(a,b) {
          if (a.index > b.index) return 1;
          if (a.index < b.index) return -1;
          return 0;
        }
      break
    }
    // ordinamento dell'array mappato contenente i valori ridotti
    mapped.sort(compareFunction);
    // rimappatura dell'array nell'ordine sortato
    var result = mapped.map((el)=>el.value);
    // ritorna il nuovo array
    return result.sort(compareFunction)
}
