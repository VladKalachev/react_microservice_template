import React from 'react'
import { Helmet } from 'react-helmet'
import Content from '../layout/Content'

class Home extends React.PureComponent {
  render() {
    return [
      <Helmet key="head">
        <title>Главная</title>
      </Helmet>,
      <Content header="head" footer="footer" key="content">
        <h2>Главная</h2>
      </Content>
    ]
  }
}

export default Home
