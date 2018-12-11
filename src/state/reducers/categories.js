export default function categories(state, action) {

    switch (action.type) {
        case 'SET_CATEGORIES_LIST':
            return {
                ...state,
                list:  action.categories
            }
        default:
            return state;
    }
}
