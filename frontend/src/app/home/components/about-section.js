import React from 'react'


class AboutSection extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <h1 className="about title">About Exome Slicer</h1>
        <p className="home info">
          Exome Slicer is a resource developed by the bioinformatics team in the Division of Genomic Diagnostics at CHOP.
          The goal is to support exome-based and targeted NGS panel development through identification of technically challenging regions in any gene or gene lists across the exome.
          Exome Slicer uses NGS quality metrics generated from 1932 samples that underwent clinical exome sequencing.
          Exome Slicer enables users to select appropriate key exon-level quality metric cutoffs and relevant transcript(s) to view or download technically challenging regions in their disease genes of interest.
        </p>
        <p className="home info">
          Our pre-print publication can be found
          <a
            href="https://www.google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            &nbsp;here.&nbsp;
          </a>
          Please cite this publication if you use this resource in your work.
        </p>
      </React.Fragment>
    )
  }
}


export default AboutSection
