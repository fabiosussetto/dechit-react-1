export default function filters(state, action) {
    switch (action.type) {
      case 'SET_FILTER_AMOUNT':
          return {
              ...state,
              amount: action.amount
          }
      case 'SET_SORT_ORDER':
          return {
              ...state,
              sortBy: action.sorter
          }
        default:
            return state;
    }
}
