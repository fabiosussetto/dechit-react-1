import axios from 'axios'

export const fetchTransactions = () => {
  //return axios.get('https://my.api.mockaroo.com/transactions?key=f02d0440')
  return axios.get('https://my.api.mockaroo.com/transactions_desc.json?key=aae33120') // Marta MOCK with description
}
