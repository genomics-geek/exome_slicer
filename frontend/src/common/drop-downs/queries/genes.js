import gql from 'graphql-tag'


export const QUERY = gql`
query allGenes ($search: String) {
  allGenes (limit: 100, search: $search) {
    gene
  }
}
`
