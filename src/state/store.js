import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import appReducer from './reducers/app'

export const store = createStore(
    appReducer,
    applyMiddleware(thunk)
)

/*store.subscribe(() => showTransaction(store.getState()));

function showTransaction(state) {
    console.log(state);
}*/

/*
    Uso localstorage per sincronozzare los stato dell'applicazione con quello del browser.
    In questo modo mantengo lo stato, anche se aggiorno la pagina.
*/