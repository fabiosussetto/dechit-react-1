import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import appReducer from './reducers/app'

export const store = createStore(
    appReducer,
    applyMiddleware(thunk)
)

store.subscribe(() => showTransaction(store.getState()));

function showTransaction(state) {
    console.log(state);
}