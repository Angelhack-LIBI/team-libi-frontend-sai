import React from "react";
import ReactDOM from "react-dom";
import { IntlProvider } from "react-intl";
import "./index.less";
import App from "./App";
import en from "locale/en.json";
import ko from "locale/ko.json";
import * as serviceWorker from "./serviceWorker";

const messages: any = { en, ko };

const locale: string = localStorage.getItem("lang") || "ko";

ReactDOM.render(
  <React.StrictMode>
    <IntlProvider locale={locale} messages={messages[locale]}>
      <App />
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
