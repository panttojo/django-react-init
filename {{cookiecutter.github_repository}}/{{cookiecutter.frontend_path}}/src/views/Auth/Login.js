import React, { Component } from 'react'

import { PROJECT_NAME } from '../../_helpers'
import { LoginForm } from './components'
import AuthLayout from '../../Layouts/Auth/Layout'
import { Link } from 'react-router-dom'


export class Login extends Component {

    render() {

        const footer = (
            <div className="m-t-40 text-center">
                <p className="text-white">Don't have an account?
                    <Link className="font-500 font-14 text-success font-secondary" to="/register">
                        {' '} Signup Now
                    </Link>
                </p>
                <p className="text-white">
                    © {new Date().getFullYear()} | {PROJECT_NAME}. Powered by  <i className="fa fa-github"></i> <a target="_blank" rel="noopener noreferrer" href="https://github.com/panttojo">panttojo</a>
                </p>
            </div>
        )
        return (
            <AuthLayout footer={footer}>
                <h4 className="font-18 m-b-5 text-center">Welcome Back!</h4>
                <p className="text-muted text-center">Sign in to continue to <b>{PROJECT_NAME} System</b>.</p>
                <LoginForm />
            </AuthLayout>
        )
    }
}
