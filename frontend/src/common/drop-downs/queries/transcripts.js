import gql from 'graphql-tag'


export const QUERY = gql`
query allTranscripts ($gene: String, $search: String) {
  allTranscripts (limit: 100, gene: $gene, search: $search) {
    transcript
  }
}
`
