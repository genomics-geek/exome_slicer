import React from 'react'
import { List } from 'semantic-ui-react'

const AboutSection = () => (
  <React.Fragment>
    <h1 className="about title">About Exome Slicer</h1>
    <p className="home info">
      Exome Slicer is a resource developed by the bioinformatics team in the Division of Genomic Diagnostics at CHOP.
      The goal is to support exome-based and targeted NGS panel development through identification of technically
      challenging regions in any gene or gene lists across the exome. Exome Slicer uses NGS quality metrics generated
      from 1932 samples that underwent clinical exome sequencing. Exome Slicer enables users to select appropriate key
      exon-level quality metric cutoffs and relevant transcript(s) to view or download technically challenging regions
      in their disease genes of interest.
    </p>
    <p className="home info">
      <strong>Note:</strong> We used NovoAlign for alignment so mapping quality max score is 70.
    </p>
    <p className="home info">
      Our publication can be found
      <a href="https://www.ncbi.nlm.nih.gov/pubmed/29936260" target="_blank" rel="noopener noreferrer">
        &nbsp;here.&nbsp;
      </a>
      Please cite this publication if you use this resource in your work.
    </p>
    <p className="home info">
      This is a beta site and we encourage users to contact us with bugs or feature suggestions.
    </p>
    <List bulleted>
      <List.Item>
        Errors in the website can be reported via
        <a href="https://github.com/genomics-geek/exome_slicer/issues" target="_blank" rel="noopener noreferrer">
          &nbsp;GitHub.&nbsp;
        </a>
      </List.Item>

      <List.Item>
        You can also contact us by
        <a href="mailto:dgdbfx@email.chop.edu?Subject=ExomeSlicer%20request" target="_top">
          &nbsp;email&nbsp;
        </a>
        to report data problems or feature suggestions.
      </List.Item>

      <List.Item>
        The data is available for download in our GitHub repo found
        <a
          href="https://raw.githubusercontent.com/genomics-geek/exome_slicer/develop/data/wes_stats_1923.txt"
          download="ExomeSlicer.txt"
        >
          &nbsp;here&nbsp;
        </a>
      </List.Item>
    </List>
  </React.Fragment>
)

export default AboutSection
