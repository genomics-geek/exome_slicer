import React from 'react'
import { Menu, Image } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'


const NavMenu = () => (
  <Menu className="NavMenu" pointing secondary style={{ backgroundColor: '#FFFFFF' }}>
    <Menu.Item>
      <Image src="https://s3.amazonaws.com/nexus.chop.edu/chop-logo.png" width="120px"/>
    </Menu.Item>

    <Menu.Menu position='right'>
      <Menu.Item
        name="gene-analyzer"
        as={NavLink}
        to="/app/gene-analyzer/"
      />
      <Menu.Item
        name="batch-analyzer"
        as={NavLink}
        to="/app/batch-analyzer/"
      />
      <Menu.Item
        icon="github"
        as="a"
        href="https://github.com/genomics-geek/exome_slicer"
        target="_blank"
        rel="noopener noreferrer"
      />
    </Menu.Menu>
  </Menu>
)


export default NavMenu
