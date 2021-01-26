import React from "react";
import { Route, Redirect } from "react-router-dom";

import AuthLayout from "~/layouts/Auth/Auth.jsx";
import AdminLayout from "~/layouts/Admin/Admin.jsx";

import { store } from "~/store";

export default function RouteWrapper({
  component: Component,
  isPrivate = false,
  ...rest
}) {
  const { signed } = store.getState().auth;
  const { Colab } = store.getState().auth.user;

  if (
    !Colab &&
    isPrivate &&
    signed &&
    (rest.path !== "/cadastro/wizard/empresa" ||
      rest.path !== "/cadastro/wizard/fornec" ||
      rest.path !== "/cadastro/wizard/colab")
  ) {
    return <Redirect to="/cadastro/wizard/empresa" />;
  }
  if (!signed && isPrivate) {
    return <Redirect to="/login" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  const Layout = signed ? AdminLayout : AuthLayout;

  return (
    <Route
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.defaultProps = {
  isPrivate: false
};
