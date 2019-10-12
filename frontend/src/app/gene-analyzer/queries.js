import gql from 'graphql-tag'

export const QUERY = gql`
  query allQualityStats($gene: String!, $transcript: String) {
    allQualityStats(gene: $gene, transcript: $transcript, sortBy: "cds_exon") {
      edges {
        node {
          id
          gene
          transcript
          cdsExon
          numberOfBaits
          pctBasesCoveredByBaits
          minMappingQuality
          maxMappingQuality
          avgMappingQuality
          minCoverage
          maxCoverage
          avgCoverage
        }
      }
    }
  }
`
