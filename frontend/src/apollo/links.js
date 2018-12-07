import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'
import { RestLink } from 'apollo-link-rest'
import cookie from 'react-cookies'


// docs: https://www.apollographql.com/docs/link/links/http.html
export const httpLink = createHttpLink({
  uri: '/graphql/',
  credentials: 'same-origin',
})


// docs: https://www.apollographql.com/docs/link/links/rest.html
export const restLink = new RestLink({
  endpoints: {
    default: process.env.REACT_APP_HOST_URL,
  },
})


export const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'X-CSRFToken': cookie.load('csrftoken')
    }
  }
})
