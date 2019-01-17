import axios from 'axios'

export default axios.create({
  baseURL: process.env.baseUrl,
  headers : {
    'X-Requested-With': 'XMLHttpRequest',
    'X-Custom-Header': 'foobar'
  }
})