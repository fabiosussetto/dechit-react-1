import axios from 'axios'

export const fetchTransactions = () => {
  //return axios.get('https://my.api.mockaroo.com/transactions?key=f02d0440')
  return axios.get('http://www.martapetrella.com/dechit-corso.json') // Marta MOCK with description
}
