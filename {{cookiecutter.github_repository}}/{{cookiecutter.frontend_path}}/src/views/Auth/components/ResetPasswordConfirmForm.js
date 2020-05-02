import React from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Row, Col, Form, Input, Button, FormGroup, Label, FormText } from 'reactstrap'

import { userActions } from '../../../_actions'


export let ResetPasswordConfirmForm = props => {
    const { register, handleSubmit, errors, watch } = useForm()
    const { loading, alert } = props
    const { token } = props.match.params


    const alerts = alert.messages instanceof Array ? alert.messages : []

    return (
        <Form className={"form-horizontal m-t-30 needs-validation" + (Object.keys(errors).length || alert.length ? " was-validated" : "")} onSubmit={handleSubmit(props.resetPasswordConfirm)} noValidate>
            <Input name='token' value={token} type="hidden" innerRef={register({ required: true })} />
            <FormGroup>
                <Label htmlFor="new_password"><i className="fa fa-lock"></i> New Password</Label>
                <Input
                    type="password"
                    name="new_password"
                    id="new_password"
                    placeholder="Enter new password"
                    required
                    innerRef={register({ required: true })}
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
                    return <div></div>
                })}
            </FormGroup>

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

            <FormGroup>
                <Row>
                    <Col className="text-right">
                        <Button
                            disabled={loading}
                            className="btn btn-primary w-md waves-effect waves-light"
                            type="submit">
                            {loading ? <i className="fa fa-spinner fa-spin"></i> : <span><i className="fa fa-save"></i> Save</span>}
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
    resetPasswordConfirm: payload => dispatch(userActions.resetPasswordConfirm(payload))
})

ResetPasswordConfirmForm = withRouter(connect(mapStatetoProps, mapDispatchToProps)(ResetPasswordConfirmForm))
