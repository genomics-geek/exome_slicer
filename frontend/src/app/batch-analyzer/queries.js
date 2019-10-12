import gql from 'graphql-tag'

export const QUERY = gql`
  query allQualityStats($genesIn: String!, $qualityFilters: String!) {
    allQualityStats(genesIn: $genesIn, qualityFilters: $qualityFilters) {
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
