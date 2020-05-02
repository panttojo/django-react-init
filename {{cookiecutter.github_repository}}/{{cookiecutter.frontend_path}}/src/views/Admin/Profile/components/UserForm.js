import React, { useEffect } from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Row, Col, Form, Input, Button, FormGroup, Label, FormText, Card, CardBody } from 'reactstrap'

import { userActions } from '../../../../_actions'


function UserForm(props) {
    const { register, handleSubmit, errors, reset } = useForm()
    const { loading, user, alert } = props

    useEffect(() => {
        reset(user)
    }, [user, reset])

    const alerts = alert.messages instanceof Array ? props.alert.messages : []

    return (
        <Card>
            <CardBody>
                <Row>
                    <Col>
                        <Form className={"form-horizontal m-t-30 needs-validation" + (Object.keys(errors).length || alerts.length ? " was-validated" : "")} onSubmit={handleSubmit(props.updateProfile)} noValidate>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>First name <span className='text-danger'>*</span></Label>
                                        <Input
                                            name="first_name"
                                            innerRef={register({ required: true })}
                                        />
                                        {errors.first_name && errors.first_name.type === 'required' && (
                                            <FormText color="danger">
                                                First name is required
                                            </FormText>
                                        )}
                                        {alerts && alerts.map((alert, key) => {
                                            if(alert.hasOwnProperty('field') && alert.field === 'first_name'){
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
                                        <Label>Last name <span className='text-danger'>*</span></Label>
                                        <Input
                                            name="last_name"
                                            innerRef={register({ required: true })}
                                        />
                                        {errors.last_name && errors.last_name.type === 'required' && (
                                            <FormText color="danger">
                                                Last name is required
                                            </FormText>
                                        )}
                                        {alerts && alerts.map((alert, key) => {
                                            if(alert.hasOwnProperty('field') && alert.field === 'last_name'){
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
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Username <span className='text-danger'>*</span></Label>
                                        <Input
                                            name="username"
                                            innerRef={register({ required: true })}
                                        />
                                        {errors.username && errors.username.type === 'required' && (
                                            <FormText color="danger">
                                                Username is required
                                            </FormText>
                                        )}
                                        {alerts && alerts.map((alert, key) => {
                                            if(alert.hasOwnProperty('field') && alert.field === 'username'){
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
                                        <Label>email <span className='text-danger'>*</span></Label>
                                        <Input
                                            name="email"
                                            type="email"
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
                                            if(alert.hasOwnProperty('field') && alert.field === 'email'){
                                                return <FormText key={key} color="danger">
                                                    {alert.message}
                                                </FormText>
                                            }
                                            return <div key={key}></div>
                                        })}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Button
                                block
                                disabled={loading}
                                color='success'
                            >
                                {loading ? <i className="fa fa-spinner fa-spin"></i> : <span><i className='fa fa-save'></i> Save</span> }
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
    updateProfile: payload => dispatch(userActions.update(payload))
})

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(UserForm))