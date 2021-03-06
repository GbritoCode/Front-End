import React from "react";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";

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

function App() {
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
