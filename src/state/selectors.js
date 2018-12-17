
export function getVisibleTransactions(state) {
    const { filters, transactions } = state
    const amount = filters.amount
    const sortDir = filters.sortDir
    const sortBy = filters.sortBy
    //* recupero la lista delle transazioni e le salvo in una variabile
    // che sovrascriverò con la lista filtrata e ordinata.
    let transactionsList = transactions.list
    // filtro le transazioni
    transactionsList = getFilteredTransactions(transactionsList,amount);
    // ordino le transazioni filtrate
    transactionsList = getSortedTransactions(transactionsList,sortDir,sortBy);
    return transactionsList
}

export function getFilteredTransactions(transactions,amount) {
    if (!amount) return transactions
    return transactions.filter(transaction => transaction.amount > amount).sort()
}

export function getSortedTransactions(transactions,sortDir,sortBy) {
    let compareFunction
    if( ! sortBy ) return transactions
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
