import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

import AuthLayout from "~/layouts/Auth/Auth.jsx";
import AdminLayout from "~/layouts/Admin/Admin.jsx";

import { store } from "~/store";
import history from "~/services/history";

export default function RouteWrapper({
  component: Component,
  isPrivate = false,
  ...rest
}) {
  const { signed } = store.getState().auth;
  const { colab } = store.getState().auth.user.Colab.CPF;

  useEffect(() => {
    if (signed && colab === null) {
      return history.push("/cadastro/wizard/empresa");
    }
  }, [colab, signed]);

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
