import React, { Component } from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Card, CardBody } from 'reactstrap'
import { Link } from 'react-router-dom'

import { alertActions } from '../../_actions'
import DissmisableAlert from '../../components/DissmisableAlert'


class AuthLayout extends Component {

    constructor(props) {
        super(props)
        this.props.clearAlerts()
    }

    render() {
        const { alert } = this.props

        return (
            <>
                <div className="accountbg"></div>
                <div className="wrapper-page">
                    <Card>
                        <CardBody>
                            <h3 className="text-center">
                                <Link to="/" className="logo logo-admin"><img src="/assets/images/logo192.png" height="100" alt="logo" /></Link>
                            </h3>
                            <DissmisableAlert {...alert} />
                            {this.props.children}
                        </CardBody>
                    </Card>

                    {this.props.footer}
                </div>
            </>
        )
    }
}

const mapStatetoProps = state => {
    return {
        alert: state.alert
    }
}

const mapDispatchToProps = dispatch => ({
    clearAlerts: () => dispatch(alertActions.clear())
})

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(AuthLayout))
