import axios from 'axios'

export default axios.create({
  baseURL: process.env.baseUrl,
  headers : {
    post: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    // 'X-Requested-With': 'XMLHttpRequest',
    'x-ddv-from-host': 'localhost:3000'
  }
})