import React, { Component } from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Card } from 'reactstrap'

import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'
import DissmisableAlert from '../../components/DissmisableAlert'
import { alertActions } from '../../_actions'


class AdminLayout extends Component {

    componentDidUpdate(prevProps) {
        const prevAlert = prevProps.alert
        const currentAlert = this.props.alert

        if (prevAlert && prevAlert.hasOwnProperty('id') && currentAlert && currentAlert.hasOwnProperty('id')) {
            if (prevAlert.id === currentAlert.id) {
                this.props.clearAlerts()
            }
        }
    }

    render() {
        const { alert, loginpage, children, sidebar, footer, header } = this.props

        return (
            <>
                {!loginpage
                    ? <main>
                        <div id="wrapper">
                            {sidebar ? <Sidebar /> : null}
                            <div className="content-page">
                                <div className="content">
                                    {header ? <Header /> : null}
                                    <div className="page-content-wrapper">
                                        <div className="container-fluid">
                                            <Card>
                                                <Card body>
                                                    {alert ? <DissmisableAlert {...alert} /> : null}
                                                    {children}
                                                </Card>
                                            </Card>
                                        </div>
                                    </div>
                                </div>
                                {footer ? <Footer /> : null}
                            </div>
                        </div>
                    </main>
                    : children}
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

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(AdminLayout))
