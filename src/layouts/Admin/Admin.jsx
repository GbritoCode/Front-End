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
import React from "react";
import { Route, Switch } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";

// core components
import AdminNavbar from "~/components/Navbars/AdminNavbar.jsx";
import Sidebar from "~/components/Sidebar/Sidebar.jsx";

import routes from "~/routes/routes";

import logo from "~/assets/img/tovoLogo.png";
import logoMini from "~/assets/img/fav icon azul.png";
import FooterSigned from "~/components/Footer/FooterSigned";

var ps;
class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeColor: "blue",
      opacity: 0,
      sidebarOpened: false
    };
  }

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(this.refs.mainPanel);
      const tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    window.addEventListener("scroll", this.showNavbarButton);
  }

  componentDidUpdate(e) {
    if (
      e.children.props.location.pathname !==
      e.children.props.history.location.pathname
    ) {
      if (navigator.platform.indexOf("Win") > -1) {
        const tables = document.querySelectorAll(".table-responsive");
        for (let i = 0; i < tables.length; i++) {
          ps = new PerfectScrollbar(tables[i]);
        }
      }
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }

  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
    window.removeEventListener("scroll", this.showNavbarButton);
  }

  showNavbarButton = () => {
    if (
      document.documentElement.scrollTop > 50 ||
      document.scrollingElement.scrollTop > 50 ||
      this.refs.mainPanel.scrollTop > 50
    ) {
      this.setState({ opacity: 1 });
    } else if (
      document.documentElement.scrollTop <= 50 ||
      document.scrollingElement.scrollTop <= 50 ||
      this.refs.mainPanel.scrollTop <= 50
    ) {
      this.setState({ opacity: 0 });
    }
  };

  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === "/admin") {
        return <Route path={prop.path} component={prop.component} key={key} />;
      }
      return null;
    });
  };

  getActiveRoute = routes => {
    const activeRoute = "";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        const collapseActiveRoute = this.getActiveRoute(routes[i].views);
        if (collapseActiveRoute === activeRoute) {
          return collapseActiveRoute;
        }
      } else if (window.location.pathname.indexOf(routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return activeRoute;
  };

  handleActiveClick = color => {
    this.setState({ activeColor: color });
  };

  handleMiniClick = () => {
    let notifyMessage = "Sidebar mini ";
    if (document.body.classList.contains("sidebar-mini")) {
      this.setState({ sidebarMini: false });
      notifyMessage += "deactivated...";
    } else {
      this.setState({ sidebarMini: true });
      notifyMessage += "activated...";
    }
    let options = {};
    options = {
      place: "tr",
      message: notifyMessage,
      type: "primary",
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7
    };
    this.refs.notificationAlert.notificationAlert(options);
    document.body.classList.toggle("sidebar-mini");
  };

  toggleSidebar = () => {
    this.setState({
      sidebarOpened: !this.state.sidebarOpened
    });
    document.documentElement.classList.toggle("nav-open");
  };

  closeSidebar = () => {
    this.setState({
      sidebarOpened: false
    });
    document.documentElement.classList.remove("nav-open");
  };

  render() {
    return (
      <div className="wrapper">
        <div className="rna-container">
          <NotificationAlert ref="notificationAlert" />
        </div>
        <div
          className="navbar-minimize-fixed"
          style={{ opacity: this.state.opacity }}
        >
          <button
            className="minimize-sidebar btn btn-link btn-just-icon"
            onClick={this.handleMiniClick}
          >
            <i className="tim-icons icon-align-center visible-on-sidebar-regular text-muted" />
            <i className="tim-icons icon-bullet-list-67 visible-on-sidebar-mini text-muted" />
          </button>
        </div>
        {console.log(this.state)}
        <Sidebar
          {...this.props}
          routes={routes}
          activeColor={this.state.activeColor}
          logo={{
            hidden: this.state.sidebarMini,
            outterLink: "https://www.aidera.com.br/",
            text: "Tovo",
            imgSrc: logo
          }}
          logoMini={{
            hidden: !this.state.sidebarMini,
            outterLink: "https://www.aidera.com.br/",
            text: "Tovo",
            imgSrc: logoMini
          }}
          closeSidebar={this.closeSidebar}
        />
        <div
          className="main-panel"
          ref="mainPanel"
          data={this.state.activeColor}
        >
          <AdminNavbar
            {...this.props}
            handleMiniClick={this.handleMiniClick}
            brandText={this.getActiveRoute(routes)}
            sidebarOpened={this.state.sidebarOpened}
            toggleSidebar={this.toggleSidebar}
          />
          <Switch>{this.getRoutes(routes)} </Switch>
          <FooterSigned style={{ paddingTop: 0 }} fluid />
        </div>
      </div>
    );
  }
}

export default Admin;
