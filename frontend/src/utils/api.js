import axios from 'axios'


const api = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 10000,
  xsrfHeaderName: 'X-CSRFToken',
  xsrfCookieName: 'XCSRF-TOKEN',
})


// Since we will only be using JSON APIs, add Content-Type: application/json to header as default
api.defaults.headers.post['Content-Type'] = 'application/json'
api.defaults.headers.put['Content-Type'] = 'application/json'
api.defaults.headers.patch['Content-Type'] = 'application/json'

// Since we will only be using JSON APIs, add Accept: application/json to header as default
api.defaults.headers.get['Accept'] = 'application/json'
api.defaults.headers.post['Accept'] = 'application/json'
api.defaults.headers.put['Accept'] = 'application/json'
api.defaults.headers.patch['Accept'] = 'application/json'


export default api
