import React, { useState } from 'react'

import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap'

import classnames from 'classnames'

import UserForm from './UserForm'
import ChangePassword from './ChangePassword'


const ProfileForms = props => {
    const [activeTab, setActiveTab] = useState('1')

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab)
    }

    return (
        <>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { toggle('1') }}
                    >
                        <i className='fa fa-user'></i> Mis datos
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggle('2') }}
                    >
                        <i className='fa fa-lock'></i> Cambiar contraseña
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <Row>
                        <Col sm={12}>
                            <UserForm />
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="2">
                    <Row>
                        <Col>
                            <ChangePassword />
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </>
    )
}

export default ProfileForms
