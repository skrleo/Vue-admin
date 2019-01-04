import * as axios from 'axios'

let options = {}
// The server-side needs a full url to works
if (process.server) {
  options.baseURL = `http://api.example.com/v1.0/api`
}

export default axios.create(options)