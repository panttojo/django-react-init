import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import { PROJECT_NAME } from '../../_helpers'
import { RegisterForm } from './components'
import AuthLayout from '../../Layouts/Auth/Layout'


export class Register extends Component {

    render() {

        const footer = (
            <div className="m-t-40 text-center">
                <p className="text-white">
                    Already have an account? <Link className="font-500 font-14 text-info font-secondary" to="/login"> Login Here</Link>
                </p>
                <p className="text-white">
                    © {new Date().getFullYear()} | {PROJECT_NAME}. Powered by  <i className="fa fa-github"></i> <a target="_blank" rel="noopener noreferrer" href="https://github.com/panttojo">panttojo</a>
                </p>
            </div>
        )
        return (
            <AuthLayout footer={footer}>
                <h4 className="font-18 m-b-5 text-center">Free Register</h4>
                <p className="text-muted text-center">Get your free <b>{PROJECT_NAME} System</b> account now.</p>
                <RegisterForm />
            </AuthLayout>
        )
    }
}
