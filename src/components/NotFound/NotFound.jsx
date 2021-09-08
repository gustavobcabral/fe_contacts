import React from 'react'
import logo from '../../assets/images/logo.png'
import ContainerWithNavBar from '../common/ContainerWithNavBar/ContainerWithNavBar'
import { Row, Col, Image } from 'react-bootstrap'

const Landing = (props) => {
  return (
    <ContainerWithNavBar {...props}>
      <Row className="text-center">
        <Col lg={{ span: 3, offset: 2 }} xs={12}>
          <h1 style={{ marginTop: '25%' }}>This page not exists</h1>
        </Col>
        <Col lg={{ span: 3, offset: 1 }} xs={12}>
          <Image src={logo} fluid />
        </Col>
      </Row>
    </ContainerWithNavBar>
  )
}

export default Landing
