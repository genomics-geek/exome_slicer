import React from 'react'
import { List } from 'semantic-ui-react'

const RecentNews = () => (
  <React.Fragment>
    <h1 className="recent-news title">Recent News</h1>
    <List className="recent-news" bulleted>
      <List.Item>2017/10/17 - Alpha release</List.Item>
      <List.Item>2018/01/17 - Beta release</List.Item>
      <List.Item>2018/01/17 - Publication on bioRxiv</List.Item>
      <List.Item>2018/04/11 - Release v0.2.0</List.Item>
      <List.Item>2018/09 - Published in the Journal of Molecular Diagnostics</List.Item>
      <List.Item>2018/12/07 - Release v1.0.0</List.Item>
      <List.Item>2019/10/14 - Release v2.0.0</List.Item>
    </List>
  </React.Fragment>
)

export default RecentNews
