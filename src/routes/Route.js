import React, { useEffect, useRef, useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { useIdleTimer } from "react-idle-timer";
import { Button, Modal, ModalBody } from "reactstrap";
import { Close, Message } from "@material-ui/icons";
import AuthLayout from "~/layouts/Auth/Auth.jsx";
import AdminLayout from "~/layouts/Admin/Admin.jsx";

import { store } from "~/store";
import history from "~/services/history";

const IDLE_STORAGE_KEY = "_idleStart";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

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

  // Restore idle warning state after navigation (component remounts on route change).
  // Without this, the modal and countdown reset every time the user navigates.
  useEffect(() => {
    if (!isPrivate) return;
    const idleTimestamp = sessionStorage.getItem(IDLE_STORAGE_KEY);
    if (!idleTimestamp) return;
    const elapsed = (Date.now() - parseInt(idleTimestamp, 10)) / 1000;
    const totalWarningSeconds = 15 * 60;
    if (elapsed >= totalWarningSeconds) {
      sessionStorage.clear();
      history.go(0);
    } else {
      const remaining = totalWarningSeconds - elapsed;
      setMinutes(Math.floor(remaining / 60));
      setSeconds(Math.floor(remaining % 60));
      setModalMini(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useInterval(
    () => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (seconds === 0) {
        if (minutes === 0) {
          sessionStorage.clear();
          history.go(0);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    },
    modalMini ? 1000 : null
  );

  const dismissModal = () => {
    sessionStorage.removeItem(IDLE_STORAGE_KEY);
    setModalMini(false);
    setMinutes(15);
    setSeconds(0);
  };

  const handleOnIdle = () => {
    if (isPrivate) {
      sessionStorage.setItem(IDLE_STORAGE_KEY, String(Date.now()));
      setModalMini(true);
    }
  };

  // When the user becomes active while the modal is open, dismiss it.
  // Without this, the countdown keeps running even if the user is back.
  const handleOnActive = () => {
    if (isPrivate) {
      dismissModal();
    }
  };

  useIdleTimer({
    timeout: 1000 * 60 * 15,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    debounce: 500,
    // Only track real user input within this tab. Excluding visibilitychange
    // and focus means switching to another tab or program does NOT reset the
    // timer — 15 min without touching this app = disconnect.
    events: [
      "mousemove",
      "keydown",
      "wheel",
      "DOMMouseScroll",
      "mousewheel",
      "mousedown",
      "touchstart",
      "touchmove",
      "MSPointerDown",
      "MSPointerMove",
    ],
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
        modalClassName="modal-mini"
        isOpen={modalMini}
        toggle={dismissModal}
      >
        <div className="modal-header justify-content-center">
          <button
            aria-hidden
            className="close"
            data-dismiss="modal"
            type="button"
            color="primary"
            onClick={dismissModal}
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
            onClick={dismissModal}
          >
            Cancelar
          </Button>

          <Button
            style={{ color: "#7E7E7E" }}
            className="btn-neutral"
            type="button"
            onClick={() => {
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
