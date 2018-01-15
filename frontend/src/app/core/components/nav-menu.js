import React from 'react'
import { Navbar } from 'react-genomix'
import { MenuItem } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

import CHOPLogo from 'Src/app/core/components/chop-logo'


class NavMenu extends React.PureComponent {
  render() {
    return (
      <Navbar subMenu={<CHOPLogo />}>
        <MenuItem
          name="Gene Analyzer"
          as={NavLink}
          to="/app/gene-analyzer/"
        />
        <MenuItem
          name="Batch Analyzer"
          as={NavLink}
          to="/app/batch-analyzer/"
        />
        <MenuItem
          icon="github"
          as="a"
          href="https://github.com/genomics-geek/exome_slicer"
          target="_blank"
          rel="noopener noreferrer"
        />
      </Navbar>
    )
  }
}


export default NavMenu
