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

import Footer from "~/components/Footer/Footer.jsx";

import routes from "~/routes/routes";

class Pages extends React.Component {
  componentDidMount() {
    document.documentElement.classList.remove("nav-open");
  }

  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === "/auth") {
        return <Route path={prop.path} component={prop.component} key={key} />;
      }
      return null;
    });
  };

  getActiveRoute = routes => {
    const activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        const collapseActiveRoute = this.getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (window.location.pathname.indexOf(routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return activeRoute;
  };

  getFullPageName = routes => {
    const pageName = this.getActiveRoute(routes);
    switch (pageName) {
      case "Pricing":
        return "pricing-page";
      case "Login":
        return "signIn";
      case "Register":
        return "register";
      case "Lock Screen":
        return "lock-page";
      default:
        return "Default Brand Text";
    }
  };

  render() {
    return (
      <>
        <div className="wrapper wrapper-full-page" ref="fullPages">
          <div className="container" style={{ paddingTop: 50 }}>
            <Switch>{this.getRoutes(routes)}</Switch>
            <Footer style={{ paddingTop: 0 }} fluid />
          </div>
        </div>
      </>
    );
  }
}

export default Pages;
