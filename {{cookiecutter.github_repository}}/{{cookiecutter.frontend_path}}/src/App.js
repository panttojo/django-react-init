import React, { Component } from 'react'

import { Router, Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { history } from './_helpers'
import { ComingSoon } from './views/Pages'
import { Login, Register, ResetPassword, ResetPasswordConfirm } from './views/Auth'
import AdminLayout from './Layouts/Admin/Layout'
import { PrivateRoute, AdminRouter } from './router'


class App extends Component {
    render() {
        const { alert, header, sidebar, footer, loginpage } = this.props
        let adminLayout = (
            <AdminLayout alert={alert} header={header} sidebar={sidebar} footer={footer} loginpage={loginpage}>
                <PrivateRoute component={AdminRouter} />
            </AdminLayout>
        )

        return (
            <Router history={history} >
                <Switch>
                    <Route exact path="/" render={props => <ComingSoon {...props} />} />
                    <Route exact path="/register" render={props => <Register {...props} />} />
                    <Route exact path="/reset-password" render={props => <ResetPassword {...props} />} />
                    <Route exact path="/reset-password/:token" render={props => <ResetPasswordConfirm {...props} />} />
                    <Route exact path="/login" render={props => <Login {...props} />} />
                    {adminLayout}
                </Switch>
            </Router>
        )
    }
}

const mapStatetoProps = state => {
    const { theme: { header, sidebar, footer, loginpage }, alert, user } = state
    return {
        header: header,
        sidebar: sidebar,
        footer: footer,
        loginpage: loginpage,
        alert,
        user: user.data
    }
}

export default withRouter(connect(mapStatetoProps)(App))