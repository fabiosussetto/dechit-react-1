// import axios from 'axios'
import _ from 'lodash'

export const fetchTransactions = () => {
  // return axios.get('https://my.api.mockaroo.com/transactions?key=f02d0440')
  // return axios.get('http://www.martapetrella.com/dechit-corso.json') // Marta MOCK with description
  const fakeTransactions = _.range(300).map((i) => ({
    id: i,
    category: "books",
    amount: (i + 1) * 10,
    description: "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque."
  }))

  return Promise.resolve({
    data: fakeTransactions
  })
}
