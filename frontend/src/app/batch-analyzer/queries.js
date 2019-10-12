import gql from 'graphql-tag'

export const QUERY = gql`
  query allQualityStats($genes: String!, $qualityFilters: String!) {
    allQualityStats(genes: $genes, qualityFilters: $qualityFilters) {
      edges {
        node {
          id
          gene
          transcript
          cdsExon
          numberOfBaits
          pctBasesCoveredByBaits
          avgMappingQuality
          minCoverage
        }
      }
    }
  }
`
