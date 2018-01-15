import React from 'react'
import { List } from 'semantic-ui-react'


class RecentNews extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <h1 className="recent-news title">Recent News</h1>
        <List className="recent-news" bulleted>
          <List.Item>2017/10/17 - Alpha release</List.Item>
          <List.Item>2017/01/15 - Beta release</List.Item>
          <List.Item>2017/01/18 - Publication on bioRxiv</List.Item>
        </List>
      </React.Fragment>
    )
  }
}


export default RecentNews
