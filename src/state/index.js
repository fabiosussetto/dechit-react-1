import axios from 'axios'

export const fetchTransactions = () => {
    return axios.get('https://my.api.mockaroo.com/transactions?key=f02d0440')
}