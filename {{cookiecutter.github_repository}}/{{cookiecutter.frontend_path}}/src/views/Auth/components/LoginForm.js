import React, { useEffect } from 'react'

import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Row, Col, Form, Input, Button, FormGroup, Label, FormText } from 'reactstrap'

import { userActions } from '../../../_actions'


export let LoginForm = props => {
    const { register, handleSubmit, errors, reset } = useForm()
    const { loading, user, alert } = props

    useEffect(() => {
        reset(user)
    }, [user, reset])

    const alerts = alert.messages instanceof Array ? alert.messages : []

    return (
        <Form className={"form-horizontal m-t-30 needs-validation" + (Object.keys(errors).length || alerts.length ? " was-validated" : "")} onSubmit={handleSubmit(props.loginUser)} noValidate>
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
                {errors.username && errors.username.type === 'pattern' && (
                    <FormText color="danger">
                        Invalid username
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
            </FormGroup>

            <FormGroup>
                <Row>
                    <Col className="text-right">
                        <Button
                            disabled={loading}
                            className="btn btn-primary w-md waves-effect waves-light"
                            type="submit">
                            {loading && <i className="fa fa-spinner fa-spin"></i>} Login
                        </Button>
                    </Col>
                </Row>
            </FormGroup>
            
            <FormGroup>
                <Row>
                    <Col>
                        <Link className="text-muted" to="/reset-password"><i className="fa fa-lock"></i> Forgot your password?</Link>
                    </Col>
                </Row>
            </FormGroup>
        </Form>
    )
}

const mapStatetoProps = state => {
    const { user, alert } = state

    return {
        loading: user.loading,
        alert,
    }
}

const mapDispatchToProps = dispatch => ({
    loginUser: payload => dispatch(userActions.login(payload))
})

LoginForm = withRouter(connect(mapStatetoProps, mapDispatchToProps)(LoginForm))
