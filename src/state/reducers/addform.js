export default function transaction_titles_list(state, action) {

    switch (action.type) {
        case 'SET_TYPES_LIST':
            return {
                ...state,
                list:  action.titles
            }
        default:
            return state;
    }
}
