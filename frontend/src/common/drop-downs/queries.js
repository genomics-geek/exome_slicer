import gql from 'graphql-tag'


export const GENES = gql`
query allGenes ($search: String) {
  allGenes (limit: 100, search: $search) {
    gene
  }
}
`

export const TRANSCRIPTS = gql`
query allTranscripts ($gene: String!, $search: String) {
  allTranscripts (limit: 100, gene: $gene, search: $search) {
    transcript
  }
}
`
