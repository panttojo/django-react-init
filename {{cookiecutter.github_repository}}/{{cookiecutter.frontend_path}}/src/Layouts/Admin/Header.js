import React, { Component } from 'react'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

import { userActions } from '../.././_actions'


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            dropdownOpen1: false,
            dropdownOpenprofile: false,
            dropdownOpenbadge: false,
            now_route: ""
        };

        this.toggle = this.toggle.bind(this);
        this.toggle1 = this.toggle1.bind(this);
        this.toggleprofile = this.toggleprofile.bind(this);
        this.togglebadge = this.togglebadge.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }
    toggle1() {
        this.setState(prevState => ({
            dropdownOpen1: !prevState.dropdownOpen1
        }));
    }
    toggleprofile() {
        this.setState(prevState => ({
            dropdownOpenprofile: !prevState.dropdownOpenprofile
        }));
    }
    togglebadge() {
        this.setState(prevState => ({
            dropdownOpenbadge: !prevState.dropdownOpenbadge
        }));
    }

    togglescreen(e) {
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    }
    componentDidMount() {
        // this.setState({ now_route: this.props.location.pathname })
    }

    render() {
        const prefix = '/admin'
        return (
            <div className="topbar">
                <nav className="navbar-custom">
                    <div className="search-wrap" id="search-wrap">
                        <div className="search-bar">
                            <input className="search-input" type="search" placeholder="Search" />
                            <a href="/#" className="close-search toggle-search" data-target="#search-wrap">
                                <i className="fa fa-search"></i>
                            </a>
                        </div>
                    </div>

                    <ul className="list-inline float-right mb-0">
                        <li className="list-inline-item dropdown notification-list">
                            <Dropdown isOpen={this.state.dropdownOpenprofile} toggle={this.toggleprofile}>
                                <DropdownToggle className="nav-link dropdown-toggle droptest arrow-none waves-effect nav-user" tag="a">
                                    <img src="/assets/images/logo192.png" alt="user" className="rounded-circle" />
                                </DropdownToggle>
                                <DropdownMenu>
                                    <Link to={`${prefix}/profile`}><DropdownItem><i className="fa fa-user-circle-o m-r-5"></i> Perfil</DropdownItem></Link>
                                    <Link to={'/'} onClick={this.props.logout}><DropdownItem><i className="fa fa-sign-out text-danger"></i> Salir</DropdownItem></Link>
                            </DropdownMenu>
                            </Dropdown>
                        </li>
                    </ul>

                    <ul className="list-inline menu-left mb-0">
                        <li className="list-inline-item">
                            <button type="button" className="button-menu-mobile open-left waves-effect">
                                <i className="fa fa-bars"></i>
                            </button>
                        </li>
                        <li className="hide-phone list-inline-item app-search">
                            <h3 className="page-title" id="now_routing">Welcome</h3>
                        </li>
                    </ul>
                    <div className="clearfix"></div>
                </nav>
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

export default connect(mapStatetoProps, mapDispatchToProps)(Header)