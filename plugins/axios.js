import axios from 'axios'
axios.defaults.withCredentials = true
export default axios.create({
  baseURL: process.env.baseUrl,
  headers : {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Custom-Header': 'foobar'
  }
})