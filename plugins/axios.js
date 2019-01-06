import axios from 'axios'

export default axios.create({
  baseURL: process.env.baseUrl,
  headers : {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    'X-Requested-With': 'XMLHttpRequest'
  },
})