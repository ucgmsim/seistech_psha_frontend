import React from "react";
import ReactDOM from "react-dom";

import { Auth0Provider } from "./components/common/ReactAuth0SPA";

import App from "./App";
import History from "utils/History";

import "assets/style/index.css";

const onRedirectCallback = (appState) => {
  History.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

// AUTH0 details from the .env file
ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    client_id={process.env.REACT_APP_AUTH0_CLIENTID}
    redirect_uri={window.location.origin}
    audience={process.env.REACT_APP_AUTH0_AUDIENCE}
    onRedirectCallback={onRedirectCallback}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
