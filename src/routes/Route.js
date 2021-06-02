import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useIdleTimer } from "react-idle-timer";
// import { Button, Modal } from "bootstrap";
// import { Close, Message } from "@material-ui/icons";
// import { ModalBody } from "reactstrap";
import AuthLayout from "~/layouts/Auth/Auth.jsx";
import AdminLayout from "~/layouts/Admin/Admin.jsx";

import { store } from "~/store";
// import history from "~/services/history";

export default function RouteWrapper({
  component: Component,
  isPrivate = false,
  ...rest
}) {
  // const [modalMini, setModalMini] = useState(true);
  // const toggleModalMini = () => {
  //   setModalMini(!modalMini);
  // };
  // console.log(modalMini);
  const { signed } = store.getState().auth;
  const { Colab, isFirstLogin } = store.getState().auth.user;

  const handleOnIdle = event => {
    if (isPrivate) {
      console.log("user is idle", event);
      // setModalMini(!modalMini);
      // sessionStorage.clear();
      // return history.go(0);
    }
  };

  const handleOnActive = event => {
    console.log("user is active", event);
    console.log("time remaining", getRemainingTime());
  };

  const { getRemainingTime } = useIdleTimer({
    timeout: 1000 * 1 * 5,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    debounce: 500
  });

  if (
    !Colab &&
    isPrivate &&
    signed &&
    rest.path !== "/cadastro/wizard/empresa" &&
    rest.path !== "/cadastro/wizard/fornec" &&
    rest.path !== "/cadastro/wizard/colab"
  ) {
    return <Redirect to="/cadastro/wizard/empresa" />;
  }
  if (
    Colab &&
    isFirstLogin &&
    isPrivate &&
    signed &&
    rest.path !== "/update/user/perfil"
  ) {
    return <Redirect to="/update/user/perfil" />;
  }
  if (!signed && isPrivate) {
    return <Redirect to="/login" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/dashboardPessoal" />;
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
