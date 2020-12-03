import React from "react";
import { Route, Redirect } from "react-router-dom";

import AuthLayout from "layouts/Auth/Auth.jsx";
import AdminLayout from "layouts/Admin/Admin.jsx";

import { store } from "~/store";

export default function RouteWrapper({
  component: Component,
  isPrivate = false,
  ...rest
}) {
  const signed = store.getState().auth.signed;
  /*
    Axios("http://localhost:51314/empresa").then((result) => {
      if (signed && result.data.length === 0) {
        //      history.push("/cadastro/wizard/empresa");
        return <Redirect to={{ pathname: "/login" }} />;
      }
    }) */

  if (!signed && isPrivate) {
    return <Redirect to="/login" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  const Layout = signed ? AdminLayout : AuthLayout;

  return (
    <Route
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.defaultProps = {
  isPrivate: false,
};
