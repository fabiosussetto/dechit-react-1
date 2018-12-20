export default function categories(state, action) {

    switch (action.type) {
        case 'SET_CATEGORIES_LIST':
            return {
                ...state,
                loading: false,
                list:  action.categories
            }
        default:
            return state;
    }
}
