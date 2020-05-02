import React from 'react'

import { Route, Redirect } from 'react-router-dom'


export const PublicRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => <Component {...props} />} />
)

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const localStorageUser = localStorage.getItem('user')
        const user = localStorageUser ? JSON.parse(localStorageUser) : false
        return user && user.auth_token
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    }} />
)
