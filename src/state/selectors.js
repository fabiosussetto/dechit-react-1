
export function getVisibleTransactions(state) {
    const transactions = state.transactions.list
    let newTransactions = transactions
    let filteredState = state
    newTransactions = getSortedTransactions(filteredState);
    //* !!! NOTE: ERRORE non cambiare lo stato.
    // quando ri-assegno un oggetto, js non si comporta come fosse un array: riassegna l'oggetto,
    // quindi state ora è uguale a filteredState. Meglio creare un nuovo array e iniettare quello.
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
    const sortDir = state.filters.sortDir
    const sortBy = state.filters.sortBy
    let compareFunction
    if( ! sortBy ) {
        return transactions
    }
    // l'array temporaneo contiene oggetti con posizione e valore di ordinamento
    var mapped = transactions.map((el)=> {
      return { index: el[sortBy], value: el };
    })
    // sorting tramite le compareFunctions
    switch(sortDir) {
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
      break;
    }
    // ordinamento dell'array mappato contenente i valori ridotti
    if(compareFunction) {
      mapped.sort(compareFunction);
    } else {
      mapped.sort();
    }
    // rimappatura dell'array nell'ordine sortato
    var result = mapped.map((el)=>el.value);
    // ritorna il nuovo array
    return result
}
