/*!

=========================================================
* Black Dashboard PRO React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";

import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { store } from "~/store";

// reactstrap components
import { Nav, Collapse } from "reactstrap";

var ps;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getCollapseStates(props.routes);
  }
  // this creates the intial state of this component based on the collapse routes
  // that it gets through this.props.routes
  getCollapseStates = (routes) => {
    let initialState = {};
    routes.map((prop, key) => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: this.getCollapseInitialState(prop.views),
          ...this.getCollapseStates(prop.views),
          ...initialState,
        };
      }

      return null;
    });
    return initialState;
  };
  // this verifies if any of the collapses should be default opened on a rerender of this component
  // for example, on the refresh of the page,
  // while on the src/views/forms/RegularForms.jsx - route /admin/regular-forms
  getCollapseInitialState(routes) {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && this.getCollapseInitialState(routes[i].views)) {
        return true;
      } else if (window.location.href.indexOf(routes[i].path) !== -1) {
        return true;
      }
    }
    return false;
  }
  // this function creates the links and collapses that appear in the sidebar (left menu)
  createLinks = (routes) => {
  const acessible = store.getState().auth.acessible;
    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }

      if(!acessible.includes(prop.namePerfil)) return null
      if (prop.collapse === true) {
        var st = {};
        st[prop["state"]] = !this.state[prop.state];
        return (
          <li
            className={this.getCollapseInitialState(prop.views) ? "active" : ""}
            key={key}
          >
            <a
              href="#pablo"
              data-toggle="collapse"
              aria-expanded={this.state[prop.state]}
              onClick={(e) => {
                e.preventDefault();
                this.setState(st);
              }}
            >
              {prop.icon !== undefined ? (
                <>
                  <i className={prop.icon} />
                  <p>
                    {prop.name}
                    <b className="caret" />
                  </p>
                </>
              ) : (
                prop.profile === "g@g.com" ? (null):(
                <>
                  <span className="sidebar-mini-icon">
                    {prop.mini}
                  </span>
                  <span className="sidebar-normal">
                    {prop.name}
                    <b className="caret" />
                  </span>
                </>
              ))}
            </a>
            <Collapse isOpen={this.state[prop.state]}>
              <ul className="nav">{this.createLinks(prop.views)}</ul>
            </Collapse>
          </li>
        );
      }
      return (
        <li className={this.activeRoute(prop.path)} key={key}>
          <NavLink
            to={prop.path}
            activeClassName=""
            onClick={this.props.closeSidebar}
          >
            {prop.icon !== undefined ? (
              <>
                <i className={prop.icon} />
                <p>{prop.name}</p>
              </>
            ) : (
              <>
                <span className="sidebar-mini-icon">
                  {prop.mini}
                </span>
                <span className="sidebar-normal">
                  {prop.name}
                </span>
              </>
            )}
          </NavLink>
        </li>
      );
    });
  };
  // verifies if routeName is the one active (in browser input)
  activeRoute = (routeName) => {
    return this.props.children.props.location.pathname.indexOf(routeName) > -1
      ? "active"
      : "";
  };
  componentDidMount() {
    // if you are using a Windows Machine, the scrollbars will have a Mac look
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebar);
    }
  }
  componentWillUnmount() {
    // we need to destroy the false scrollbar when we navigate
    // to a page that doesn't have this component rendered
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  render() {
    const { activeColor, logo, logoMini } = this.props;
    let logoImg = null;
    let logoText = null;
    let logoMiniImg = null;
    if (logo !== undefined) {
      if (logo.outterLink !== undefined) {
        logoImg = (
          <NavLink
            to={logo.outterLink}
            className="simple-text logo-mini"
            onClick={this.props.closeSidebar}
            style={{width:120}}
          >
            <div className="logo-img-big">
              <img hidden={logo.hidden} src={logo.imgSrc} alt="react-logo" />
            </div>
          </NavLink>
        );
        logoMiniImg = (
          <NavLink
            to={logoMini.outterLink}
            className="simple-text logo-mini"
            onClick={this.props.closeSidebar}
            style={{paddingLeft: 0, marginLeft: 0, position:"absolute"}}
          >
            <div className="logo-img">
              <img style={{width:40}} hidden={logoMini.hidden} src={logoMini.imgSrc} alt="react-logo" />
            </div>
          </NavLink>
        );
        logoText = (
          <div>
          <a
            href={logo.outterLink}
            className="simple-text logo-normal"
            target="_blank"
            onClick={this.props.closeSidebar}
          >
          </a>
          </div>
        );
      } else {
        logoImg = (
          <NavLink
            to={logo.innerLink}
            className="simple-text logo-mini"
            onClick={this.props.closeSidebar}
          >
            <div className="logo-img">
              <img src={logo.imgSrc} alt="react-logo" />
            </div>
          </NavLink>
        );
        logoText = (
          <NavLink
            to={logo.innerLink}
            className="simple-text logo-normal"
            onClick={this.props.closeSidebar}
          >
            {' '}
          </NavLink>
        );
      }
    }
    return (
      <div className="sidebar" data={activeColor}>
        <div className="sidebar-wrapper" ref="sidebar">
          {logoImg !== null || logoText !== null ? (
            <div className="logo" style={{paddingLeft: 0}}>
              {logoMiniImg}
              {logoImg}
              {logoText}
            </div>
          ) : null}
          <Nav>{this.createLinks(this.props.routes)}</Nav>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  activeColor: PropTypes.oneOf(["primary", "blue", "green", "orange", "red"]),
  routes: PropTypes.array.isRequired,
  logoMini: PropTypes.oneOfType([
    PropTypes.shape({
      innerLink: PropTypes.string.isRequired,
      imgSrc: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
    PropTypes.shape({
      hidden: PropTypes.bool.isRequired,
      outterLink: PropTypes.string.isRequired,
      imgSrc: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ]),
  logo: PropTypes.oneOfType([
    PropTypes.shape({
      innerLink: PropTypes.string.isRequired,
      imgSrc: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
    PropTypes.shape({
      hidden: PropTypes.bool.isRequired,
      outterLink: PropTypes.string.isRequired,
      imgSrc: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ]),
  // this is used on responsive to close the sidebar on route navigation
  closeSidebar: PropTypes.func,
};

export default Sidebar;
