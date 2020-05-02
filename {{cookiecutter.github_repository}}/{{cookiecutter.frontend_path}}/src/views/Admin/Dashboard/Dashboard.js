import React, { Component } from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'


class Dashboard extends Component {

    render() {
        const { user } = this.props

        return (
            <h5>¡Bienvenido <b>{user.username}</b>!</h5>
        );
    }
}

const mapStatetoProps = state => {
    const { alert, user } = state

    return {
        alert,
        user: user.data
    }
}

export default withRouter(connect(mapStatetoProps)(Dashboard))