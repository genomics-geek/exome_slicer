import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'

import cache from './cache'
import { authLink, httpLink, restLink } from './links'


const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
  mutate: {
    // NOTE: Using 'none' will allow Apollo to recognize errors even if the response
    // includes {data: null} in it (graphene does this with each unsuccessful mutation!)
    errorPolicy: 'none'
  }
}


const client = new ApolloClient({
  link: ApolloLink.from([ authLink.concat(restLink), authLink.concat(httpLink) ]),
  cache: cache,
  connectToDevTools: (process.env.NODE_ENV === 'production') ? false : true,
  defaultOptions,
})


export default client
