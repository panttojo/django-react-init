import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import ReactMomentCountDown from 'react-moment-countdown'
import { Row, Col, Button } from 'reactstrap'
import moment from 'moment'


export class ComingSoon extends Component {

    render() {

        const dateInFuture = moment('2025-07-15 18:00:00', 'YYYY-MM-DD HH:mm:ss');
        return (
            <>
                <div className="accountbg"></div>
                <section className="mt-5 mb-5">
                    <div className="container-alt container">
                        <div className="row">
                            <div className="col-12 text-center">
                                <div className="home-wrapper m-t-40">
                                    <Row>
                                        <Col>
                                            <Link to="/login"><img src="/assets/images/logo512.png" alt="logo" height="400" /></Link>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Link to="/login">
                                                <Button color="info">Login</Button>
                                            </Link>
                                        </Col>
                                    </Row>
                                    <h3 className="m-t-30 text-white">Coming Soon</h3>
                                    <p className='text-white'>We are working hard to launch a new website with new features. </p>

                                    <div className="coming-watch text-center mb-5">
                                        <div className="countdown">
                                            <div className="lj-countdown-ms testtimes">
                                                <ReactMomentCountDown className='text-white' toDate={dateInFuture} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}
