import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import appReducer from './reducers/app'


export const store = createStore(
    appReducer,
    applyMiddleware(thunk)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)