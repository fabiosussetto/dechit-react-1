export default function jobs(state, action) {

    switch (action.type) {
        case 'SET_JOBS_LIST':
            return {
                ...state,
                loading: false,
                list:  action.jobs
            }
        default:
            return state;
    }
}
