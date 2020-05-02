import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Dashboard from '../views/Admin/Dashboard/Dashboard'
import Profile from '../views/Admin/Profile/Profile'


export class AdminRouter extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/admin" render={props => <Dashboard {...props} />} />
                <Route exact path="/admin/profile" render={props => <Profile {...props} />} />
            </Switch>
        )
    }
}
