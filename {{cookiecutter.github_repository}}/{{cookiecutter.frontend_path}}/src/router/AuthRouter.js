import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'


import { Login, Register, ResetPassword, ResetPasswordConfirm } from '../views/Auth'


export class AuthRouter extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/login" render={props => <Login {...props} />} />
                <Route exact path="/register" render={props => <Register {...props} />} />
                <Route exact path="/reset-password" render={props => <ResetPassword {...props} />} />
                <Route exact path="/reset-password/:token" render={props => <ResetPasswordConfirm {...props} />} />
            </Switch>
        )
    }
}