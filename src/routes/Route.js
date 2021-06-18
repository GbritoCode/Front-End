import React, { useEffect, useRef, useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { useIdleTimer } from "react-idle-timer";
// import { Close, Message } from "@material-ui/icons";
import { Button, Modal, ModalBody } from "reactstrap";
import { Close, Message } from "@material-ui/icons";
import AuthLayout from "~/layouts/Auth/Auth.jsx";
import AdminLayout from "~/layouts/Admin/Admin.jsx";

import { store } from "~/store";
import history from "~/services/history";
// import history from "~/services/history";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default function RouteWrapper({
  component: Component,
  isPrivate = false,
  ...rest
}) {
  const { signed } = store.getState().auth;
  const { Colab, isFirstLogin } = store.getState().auth.user;

  const [modalMini, setModalMini] = useState(false);
  const [minutes, setMinutes] = useState(15);
  const [seconds, setSeconds] = useState(0);

  useInterval(
    () => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (seconds === 0) {
        if (minutes === 0) {
          sessionStorage.clear();
          history.go(0);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    },
    modalMini ? 1000 : null
  );

  const handleOnIdle = event => {
    if (isPrivate) {
      console.log("user is idle", event);
      setModalMini(true);
    }
  };

  const handleOnActive = event => {
    console.log("user is active", event);
    console.log("time remaining", getRemainingTime());
  };

  const { getRemainingTime } = useIdleTimer({
    timeout: 1000 * 60 * 15,
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

  const toggleModalMini = () => {
    setModalMini(!modalMini);
  };
  return (
    <>
      <Switch>
        <Route
          render={props => (
            <Layout>
              <Component {...props} />
            </Layout>
          )}
        />
      </Switch>
      <Modal
        modalClassName="modal-mini "
        isOpen={modalMini}
        toggle={() => {
          toggleModalMini();
          setSeconds(0);
          setMinutes(15);
        }}
      >
        <div className="modal-header justify-content-center">
          <button
            aria-hidden
            className="close"
            data-dismiss="modal"
            type="button"
            color="primary"
            onClick={() => {
              toggleModalMini();
              setSeconds(0);
              setMinutes(15);
            }}
          >
            <Close />
          </button>
          <div>
            <Message fontSize="large" />
          </div>
        </div>
        <ModalBody className="text-center">
          <p>
            {" "}
            Você ficou ausente, desconexão em: {minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}{" "}
          </p>
        </ModalBody>
        <div className="modal-footer">
          <Button
            style={{ color: "#000" }}
            className="btn-neutral"
            type="button"
            onClick={() => {
              toggleModalMini();
              setSeconds(0);
              setMinutes(15);
            }}
          >
            Cancelar
          </Button>

          <Button
            style={{ color: "#7E7E7E" }}
            className="btn-neutral"
            type="button"
            onClick={() => {
              toggleModalMini();
              sessionStorage.clear();
              history.go(0);
            }}
          >
            Logout
          </Button>
        </div>
      </Modal>
    </>
  );
}

RouteWrapper.defaultProps = {
  isPrivate: false
};
