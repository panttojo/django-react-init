import React, { Component } from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Row, Col } from 'reactstrap'

import { userActions } from '../../../_actions'
import TabPane from './components/TabPane'


class Profile extends Component {

    componentDidMount() {
        this.props.getProfile()
    }

    render() {
        return (
            <Row>
                <Col>
                    <TabPane />
                </Col>
            </Row>
        )
    }
}

const mapStatetoProps = state => {

    return {}
}

const mapDispatchToProps = dispatch => ({
    getProfile: () => dispatch(userActions.profile())
})

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Profile))