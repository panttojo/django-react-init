import React, { useEffect } from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Row, Col, Form, Input, Button, FormGroup, Label, FormText, Card, CardBody } from 'reactstrap'

import { userActions } from '../../../../_actions'


function ChangePassword(props) {
    const { register, handleSubmit, errors, reset, watch } = useForm()

    const alerts = props.alert.messages instanceof Array ? props.alert.messages : []
    const { loading } = props

    useEffect(() => {
        reset(props.data)

    }, [props.data, reset])

    return (
        <Card>
            <CardBody>
                <Row>
                    <Col>
                        <Form onSubmit={handleSubmit(props.updatePassword)} noValidate>
                            <Row> 
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Current password <span className='text-danger'>*</span></Label>
                                        <Input
                                            name="current_password"
                                            innerRef={register({ required: true })}
                                            type="password"
                                        />
                                        {errors.current_password && errors.current_password.type === 'required' && (
                                            <FormText color="danger">
                                                Current password is required
                                            </FormText>
                                        )}
                                        {alerts && alerts.map((alert, key) => {
                                            if (alert.hasOwnProperty('field') && alert.field === 'current_password') {
                                                return <FormText key={key} color="danger">
                                                    {alert.message}
                                                </FormText>
                                            }
                                            return <div key={key}></div>
                                        })}
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>New password <span className='text-danger'>*</span></Label>
                                        <Input
                                            name="new_password"
                                            innerRef={register({ required: true })}
                                            type="password"
                                        />
                                        {errors.new_password && errors.new_password.type === 'required' && (
                                            <FormText color="danger">
                                                New password is required
                                            </FormText>
                                        )}
                                        {alerts && alerts.map((alert, key) => {
                                            if (alert.hasOwnProperty('field') && alert.field === 'new_password') {
                                                return <FormText key={key} color="danger">
                                                    {alert.message}
                                                </FormText>
                                            }
                                            return <div key={key}></div>
                                        })}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={{ size: 6, offset: 6 }}>
                                    <FormGroup>
                                        <Label>Confirm password <span className='text-danger'>*</span></Label>
                                        <Input
                                            name="new_password_confirm"
                                            innerRef={register({
                                                required: true,
                                                validate: value => value === watch('new_password')
                                            })}
                                            type="password"
                                        />
                                        {errors.new_password_confirm && errors.new_password_confirm.type === 'required' && (
                                            <FormText color="danger">
                                                Please confirm the new password
                                            </FormText>
                                        )}
                                        {errors.new_password_confirm && errors.new_password_confirm.type === 'validate' && (
                                            <FormText color="danger">
                                                Password confirm does not match
                                            </FormText>
                                        )}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Button
                                block
                                disabled={loading}
                                color='success'
                            >
                                {loading ? <i className="fa fa-spinner fa-spin"></i> : <span><i className='fa fa-lock'></i>  Update password</span>}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

const mapStatetoProps = state => {
    const { user, alert } = state

    return {
        user: user.data,
        loading: user.loading,
        alert
    }
}

const mapDispatchToProps = dispatch => ({
    updatePassword: payload => dispatch(userActions.updatePassword(payload))
})

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(ChangePassword))