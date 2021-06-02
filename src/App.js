import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { useIdleTimer } from "react-idle-timer";
// import ClienteUpdate from "~/views/forms/Update/Cliente/ClienteUpdate";
// import { Button, Modal } from "bootstrap";
// import { Close, Message } from "@material-ui/icons";
// import { ModalBody } from "reactstrap";
import "./config/reactotronConfig";

import Routes from "./routes";

import { store, persistor } from "./store";

import "~/assets/css/nucleo-icons.css";
import "react-notification-alert/dist/animate.css";
// eslint-disable-next-line import/no-unresolved
import "~/assets/scss/black-dashboard-pro-react.scss?v=1.1.0";
import "~/assets/demo/demo.css";
import GlobalStyle from "./styles/global";
import history from "./services/history";

function App() {
  useEffect(() => {
    localStorage.clear();
  });
  // const [modalMini, setModalMini] = useState(true);
  // const toggleModalMini = () => {
  //   setModalMini(!modalMini);
  // };
  const handleOnIdle = event => {
    if (window.location.pathname !== "/login") {
      console.log("user is idle", event);
      // alert();
      // setModalMini(!modalMini);
      sessionStorage.clear();
      return history.go(0);
    }
  };

  const handleOnActive = event => {
    console.log("user is active", event);
    console.log("time remaining", getRemainingTime());
  };

  const { getRemainingTime } = useIdleTimer({
    timeout: 1000 * 60 * 45,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    debounce: 500
  });

  console.log(window.location);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes />
          <GlobalStyle />
          <ToastContainer autoClose={3000} />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
