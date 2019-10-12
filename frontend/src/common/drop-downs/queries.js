import gql from 'graphql-tag'

export const GENES = gql`
  query allGenes($search: String, $symbol: String) {
    allGenes(limit: 100, search: $search, symbol: $symbol) {
      gene
    }
  }
`

export const TRANSCRIPTS = gql`
  query allTranscripts($gene: String!, $search: String, $transcript: String) {
    allTranscripts(limit: 100, gene: $gene, search: $search, transcript: $transcript) {
      transcript
    }
  }
`
