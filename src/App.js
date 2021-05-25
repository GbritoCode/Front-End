import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import { Router } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import jwt from "jsonwebtoken";
import { promisify } from "util";
// import ClienteUpdate from "~/views/forms/Update/Cliente/ClienteUpdate";

import "./config/reactotronConfig";

import Routes from "./routes";
import history from "./services/history";

import { store, persistor } from "./store";

import "~/assets/css/nucleo-icons.css";
import "react-notification-alert/dist/animate.css";
// eslint-disable-next-line import/no-unresolved
import "~/assets/scss/black-dashboard-pro-react.scss?v=1.1.0";
import "~/assets/demo/demo.css";

import GlobalStyle from "./styles/global";
import api from "./services/api";
import { signInRequest } from "./store/modules/auth/actions";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const loginCheck = async () => {
      await api
        .post("/sessions", { email: "g@g.com", senha: "123123" })
        .then(async result => {
          const decoded = await promisify(jwt.verify)(
            result.data.token,
            "f29618255c309de4469993cce24286ea"
          );
          console.log(decoded);
          dispatch(signInRequest("g@g.com", "senha"));
        });
    };
    loginCheck();
  }, [dispatch]);

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
