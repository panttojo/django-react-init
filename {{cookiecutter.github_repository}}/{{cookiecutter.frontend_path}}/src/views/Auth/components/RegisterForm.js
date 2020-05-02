import React, { useEffect } from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Row, Col, Form, Input, Button, FormGroup, Label, FormText } from 'reactstrap'

import { userActions } from '../../../_actions'


export let RegisterForm = props => {
    const { register, handleSubmit, errors, reset } = useForm()
    const { loading, user, alert } = props

    useEffect(() => {
        reset(user)
    }, [user, reset])

    const alerts = alert.messages instanceof Array ? alert.messages : []
    

    return (
        <Form className={"form-horizontal m-t-30 needs-validation" + (Object.keys(errors).length || alert.length ? " was-validated" : "")} onSubmit={handleSubmit(props.registerUser)} noValidate>
            <FormGroup>
                <Label htmlFor="username"><i className="fa fa-user"></i> Username</Label>
                <Input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Enter username"
                    required
                    innerRef={register({ required: true })}
                />
                {errors.username && errors.username.type === 'required' && (
                    <FormText color="danger">
                        Username is required
                    </FormText>
                )}
                {alerts && alerts.map((alert, key) => {
                    if (alert.hasOwnProperty('field') && alert.field === 'username') {
                        return <FormText key={key} color="danger">
                            {alert.message}
                        </FormText>
                    }
                    return <div></div>
                })}
            </FormGroup>

            <FormGroup>
                <Label htmlFor="email"><i className="fa fa-envelope"></i> Email</Label>
                <Input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Enter email"
                    required
                    innerRef={register({ 
                        required: true,
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    })}
                />
                {errors.email && errors.email.type === 'required' && (
                    <FormText color="danger">
                        Email is required
                    </FormText>
                )}
                {errors.email && errors.email.type === 'pattern' && (
                    <FormText color="danger">
                        Invalid email
                    </FormText>
                )}
                {alerts && alerts.map((alert, key) => {
                    if (alert.hasOwnProperty('field') && alert.field === 'email') {
                        return <FormText key={key} color="danger">
                            {alert.message}
                        </FormText>
                    }
                    return <div></div>
                })}
            </FormGroup>

            <FormGroup>
                <Label htmlFor="password"><i className="fa fa-lock"></i> Password</Label>
                <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter password"
                    required
                    innerRef={register({ required: true })}
                />
                {errors.password && errors.password.type === 'required' && (
                    <FormText color="danger">
                        Password is required
                    </FormText>
                )}
                {alerts && alerts.map((alert, key) => {
                    if (alert.hasOwnProperty('field') && alert.field === 'password') {
                        return <FormText key={key} color="danger">
                            {alert.message}
                        </FormText>
                    }
                    return <div></div>
                })}
            </FormGroup>

            <FormGroup>
                <Row>
                    <Col className="text-right">
                        <Button
                            disabled={loading}
                            className="btn btn-primary w-md waves-effect waves-light"
                            type="submit">
                            {loading && <i className="fa fa-spinner fa-spin"></i>} Register
                        </Button>
                    </Col>
                </Row>
            </FormGroup>
        </Form>
    )
}

const mapStatetoProps = state => {
    const { user, alert } = state

    return {
        user: user.data,
        loading: user.loading,
        alert,
    }
}

const mapDispatchToProps = dispatch => ({
    registerUser: payload => dispatch(userActions.register(payload))
})

RegisterForm = withRouter(connect(mapStatetoProps, mapDispatchToProps)(RegisterForm))
