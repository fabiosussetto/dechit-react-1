import axios from 'axios';

export const fetchTransaction = () => {
    return axios.get('https://my.api.mockaroo.com/transactions?key=f02d0440')
  }