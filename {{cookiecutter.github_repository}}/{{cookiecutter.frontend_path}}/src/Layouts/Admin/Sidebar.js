import React, { Component } from 'react'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'
import $ from 'jquery'

import { userActions } from '../../_actions'

class sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Tab: 'index',
            SubTab: '',
            MoreTab: '',
            optionNames: {
                profile: 'Perfil',
                dashboard: 'Dashboard'
            }
        };
    }

    setActiveTab = (tab, subtab, moretab, toggleTab, e) => {
        this.setState({ Tab: tab, SubTab: subtab, MoreTab: moretab });
    }

    componentDidMount() {
        const optionNames = this.state.optionNames
        var now_route = "";
        var pageUrl = window.location.pathname.split(/[?#]/)[0];
        pageUrl = pageUrl.replace('admin', '').replace('/', '')
        now_route = pageUrl.substr(1).replace(/_/g, " ");
        $('#now_routing').empty();
        if (now_route === "") { now_route = "dashboard" } else { }
        $('#now_routing').append(optionNames[now_route]);

        $('.button-menu-mobile').on('click', function (event) {
            event.preventDefault();
            $("body").toggleClass("enlarged");
        });

        $('li.has_sub li').on('click', function (event) {
            $("body").toggleClass("enlarged");
        });
    }
    componentDidUpdate() {
        const optionNames = this.state.optionNames
        var now_route = "";
        var pageUrl = window.location.pathname.split(/[?#]/)[0];
        pageUrl = pageUrl.replace('admin', '').replace('/', '')
        now_route = pageUrl.substr(1).replace("_", " ");
        $('#now_routing').empty();
        if (now_route === "") { now_route = "dashboard" } else { }
        $('#now_routing').append(optionNames[now_route]);
    }

    render() {
        const prefix = '/admin'
        return (
            <div className="left side-menu">

                <div className="topbar-left">
                    <div className="">
                        <Link to="/" className="logo"><img src="/assets/images/logo192.png" height="36" alt="logo" /></Link>
                    </div>
                </div>

                <div className="sidebar-inner slimscrollleft" >
                    <PerfectScrollbar>
                        <div id="sidebar-menu">
                            <ul>
                                <li className="menu-title">Menú</li>
                                <li>
                                    <Link to={prefix} className={this.state.Tab === 'index' ? 'waves-effect active-menu' : 'waves-effect'} onClick={this.setActiveTab.bind(this, 'index', '', '')}>
                                        <i className="fa fa-dashboard"></i> <span>Inicio</span>
                                    </Link>
                                </li>
                                <li className="menu-title">Auth</li>
                                <li>
                                    <Link to={`${prefix}/profile`} className={this.state.Tab === 'profile' ? 'waves-effect active-menu' : 'waves-effect'} onClick={this.setActiveTab.bind('profile', 'profile', '', '')}>
                                        <i className="fa fa-user-circle"></i> Perfil
                                    </Link>
                                    <Link to={'/'} onClick={this.props.logout}><i className="fa fa-sign-out text-danger"></i> Salir</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="clearfix"></div>
                    </PerfectScrollbar>
                </div>

            </div>
        );
    }
}

const mapStatetoProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(userActions.logout())
})

export default connect(mapStatetoProps, mapDispatchToProps)(sidebar)